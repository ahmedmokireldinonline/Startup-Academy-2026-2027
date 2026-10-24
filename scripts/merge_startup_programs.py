#!/usr/bin/env python3
import csv
import json
import re
from pathlib import Path
from copy import copy
from datetime import datetime
import openpyxl
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.worksheet.table import Table, TableStyleInfo
from openpyxl.utils import get_column_letter

ROOT = Path(__file__).resolve().parents[1]
EXCEL_SOURCE = Path('/home/ubuntu/upload/Global_Startup_Grants_AI_Credits_SaaS_Benefits.xlsx')
REPO_CSV = ROOT / 'programs.csv'
OUT_XLSX = ROOT / 'Global_Startup_Programs_Unified_2026-10-24.xlsx'
OUT_CSV = ROOT / 'data' / 'unified-startup-programs.csv'
OUT_JSON = ROOT / 'data' / 'unified-startup-programs.json'
OUT_PROMO = ROOT / 'data' / 'promo-referral-registry.csv'

TODAY = '2026-10-24'

def norm(value):
    return re.sub(r'[^a-z0-9]+', '', str(value or '').lower())

def tokens(value):
    return set(re.findall(r'[a-z0-9]+', str(value or '').lower()))

def clean(value):
    if value is None:
        return ''
    if isinstance(value, datetime):
        return value.date().isoformat()
    return str(value).strip()

def load_excel_master():
    wb = openpyxl.load_workbook(EXCEL_SOURCE, read_only=True, data_only=True)
    ws = wb['Master Database']
    rows = ws.iter_rows(values_only=True)
    headers = [clean(x) for x in next(rows)]
    records = []
    for row in rows:
        rec = {headers[i]: clean(row[i] if i < len(row) else '') for i in range(len(headers))}
        if any(rec.values()):
            records.append(rec)
    return records

def load_repo():
    with REPO_CSV.open(encoding='utf-8-sig', newline='') as f:
        return list(csv.DictReader(f))

def find_repo_match(excel, repo_rows):
    e_provider = norm(excel.get('Company Name'))
    e_name = norm(excel.get('Program Name'))
    e_url = excel.get('Official Program URL') or excel.get('Application URL')
    # Strongest match: exact normalized provider + program.
    for r in repo_rows:
        if (norm(r.get('provider')) == e_provider and norm(r.get('name')) == e_name):
            return r, 'Exact provider + program'
    # Exact official URL match.
    if e_url:
        for r in repo_rows:
            if e_url == r.get('link'):
                return r, 'Exact official URL'
    # Conservative token match for naming variants such as "Startup Grants" vs "Startup Grant".
    e_tokens = tokens(excel.get('Program Name'))
    best = None
    best_score = 0
    for r in repo_rows:
        r_tokens = tokens(r.get('name'))
        if not e_tokens or not r_tokens:
            continue
        score = len(e_tokens & r_tokens) / max(1, len(e_tokens | r_tokens))
        if norm(excel.get('Company Name')) and norm(r.get('provider')) == norm(excel.get('Company Name')):
            score += 0.35
        if score > best_score:
            best, best_score = r, score
    if best is not None and best_score >= 0.82:
        return best, f'Conservative fuzzy match ({best_score:.2f})'
    return None, ''

def base_from_excel(e):
    return {
        'Unified ID': e.get('Record ID', ''),
        'Company / Provider': e.get('Company Name', ''),
        'Program Name': e.get('Program Name', ''),
        'Parent Company': e.get('Parent Company', ''),
        'Main Category': e.get('Main Category', ''),
        'Subcategory': e.get('Subcategory', ''),
        'Benefit Type': e.get('Benefit Type', ''),
        'Benefit Description': e.get('Benefit Description', ''),
        'Maximum Advertised Value': e.get('Maximum Advertised Value', ''),
        'Currency': e.get('Currency', ''),
        'Value Type': e.get('Value Type', ''),
        'Minimum Guaranteed Value': e.get('Minimum Guaranteed Value', ''),
        'Free Credits Amount': e.get('Free Credits Amount', ''),
        'Discount Percentage': e.get('Discount Percentage', ''),
        'Program Status': e.get('Program Status', ''),
        'Application URL': e.get('Application URL', ''),
        'Official Program URL': e.get('Official Program URL', ''),
        'Redemption URL': e.get('Redemption URL', ''),
        'Eligibility Requirements': e.get('Eligibility Requirements', ''),
        'Startup Stage Requirements': e.get('Startup Stage Requirements', ''),
        'Company Registration Required?': e.get('Company Registration Required?', ''),
        'Funding or VC Backing Required?': e.get('Funding or VC Backing Required?', ''),
        'Geographic Eligibility': e.get('Geographic Eligibility', ''),
        'Available to Egypt-Based Startups?': e.get('Available to Egypt-Based Startups?', ''),
        'Available to Bootstrapped Startups?': e.get('Available to Bootstrapped Startups?', ''),
        'Available to Solo Founders?': e.get('Available to Solo Founders?', ''),
        'AI-Specific Program?': e.get('AI-Specific Program?', ''),
        'Partner or Accelerator Required?': e.get('Partner or Accelerator Required?', ''),
        'Application Method': e.get('Application Method', ''),
        'Required Documents': e.get('Required Documents', ''),
        'Usage Restrictions': e.get('Usage Restrictions', ''),
        'Renewal Conditions': e.get('Renewal Conditions', ''),
        'Stacking Policy': e.get('Stacking Policy', ''),
        'Account or Payment Requirements': e.get('Account or Payment Requirements', ''),
        'Key Limitations': e.get('Key Limitations', ''),
        'Official Evidence URL': e.get('Official Evidence URL', ''),
        'Secondary Evidence URL': e.get('Secondary Evidence URL', ''),
        'Evidence Excerpt or Supporting Fact': e.get('Evidence Excerpt or Supporting Fact', ''),
        'Last Verified Date': e.get('Last Verified Date', ''),
        'Verification Confidence': e.get('Verification Confidence', ''),
        'Source Type': e.get('Source Type', ''),
        'Country or Region': e.get('Country or Region', ''),
        'Tags': e.get('Tags', ''),
        'Research Notes': e.get('Research Notes', ''),
        'Duplicate Group ID': e.get('Duplicate Group ID', ''),
    }

def repo_only_base(r, uid):
    return {
        'Unified ID': uid,
        'Company / Provider': r.get('provider', ''),
        'Program Name': r.get('name', ''),
        'Parent Company': '',
        'Main Category': r.get('primary_category', r.get('category', '')),
        'Subcategory': '; '.join(x for x in [r.get('type',''), r.get('secondary_categories','')] if x),
        'Benefit Type': r.get('type', ''),
        'Benefit Description': r.get('short', ''),
        'Maximum Advertised Value': '',
        'Currency': '',
        'Value Type': '',
        'Minimum Guaranteed Value': '',
        'Free Credits Amount': '',
        'Discount Percentage': '',
        'Program Status': r.get('status', ''),
        'Application URL': r.get('link', ''),
        'Official Program URL': r.get('link', ''),
        'Redemption URL': '',
        'Eligibility Requirements': r.get('eligibility', ''),
        'Startup Stage Requirements': r.get('stage', ''),
        'Company Registration Required?': '',
        'Funding or VC Backing Required?': '',
        'Geographic Eligibility': r.get('location', r.get('region', '')),
        'Available to Egypt-Based Startups?': 'Unverified',
        'Available to Bootstrapped Startups?': 'Unknown',
        'Available to Solo Founders?': 'Unknown',
        'AI-Specific Program?': 'Unknown',
        'Partner or Accelerator Required?': r.get('prereq', ''),
        'Application Method': r.get('steps', ''),
        'Required Documents': r.get('docs', ''),
        'Usage Restrictions': r.get('limits', ''),
        'Renewal Conditions': '',
        'Stacking Policy': '',
        'Account or Payment Requirements': '',
        'Key Limitations': r.get('limits', ''),
        'Official Evidence URL': r.get('link', ''),
        'Secondary Evidence URL': '',
        'Evidence Excerpt or Supporting Fact': r.get('benefits', ''),
        'Last Verified Date': r.get('last_verified', ''),
        'Verification Confidence': 'Repo source; preserve original confidence context',
        'Source Type': 'GitHub repository',
        'Country or Region': r.get('region', ''),
        'Tags': r.get('secondary_categories', ''),
        'Research Notes': r.get('timeline', ''),
        'Duplicate Group ID': '',
    }

def build_rows(excel_rows, repo_rows):
    unified=[]; used_repo=set(); match_meta={}
    for e in excel_rows:
        r, how = find_repo_match(e, repo_rows)
        row=base_from_excel(e)
        if r:
            idx=repo_rows.index(r); used_repo.add(idx)
            match_meta[row['Unified ID']] = (r, how)
            row['Source Presence'] = 'Excel + GitHub repo'
            row['Repo ID'] = r.get('id','')
            row['Repo Coupon Status'] = r.get('coupon_status','')
            row['Promo / Referral Code'] = r.get('coupon_code','')
            row['Promo / Referral Source'] = r.get('coupon_source','')
            row['Promo / Referral Notes'] = r.get('coupon_notes','')
            row['Repo Match Method'] = how
            row['Repo Community Signal'] = r.get('community_signal','')
        else:
            match_meta[row['Unified ID']] = (None, '')
            row['Source Presence'] = 'Excel only'
            for k in ['Repo ID','Repo Coupon Status','Promo / Referral Code','Promo / Referral Source','Promo / Referral Notes','Repo Match Method','Repo Community Signal']:
                row[k]=''
        unified.append(row)
    next_num=1
    for idx,r in enumerate(repo_rows):
        if idx in used_repo: continue
        uid='REPO-' + str(next_num).zfill(3); next_num+=1
        row=repo_only_base(r, uid)
        row['Source Presence']='GitHub repo only'
        row['Repo ID']=r.get('id','')
        row['Repo Coupon Status']=r.get('coupon_status','')
        row['Promo / Referral Code']=r.get('coupon_code','')
        row['Promo / Referral Source']=r.get('coupon_source','')
        row['Promo / Referral Notes']=r.get('coupon_notes','')
        row['Repo Match Method']='No Excel match'
        row['Repo Community Signal']=r.get('community_signal','')
        unified.append(row)
    # deterministic duplicate key and counts for filtering
    groups={}
    for row in unified:
        key='|'.join([norm(row['Company / Provider']), norm(row['Program Name'])])
        groups.setdefault(key,[]).append(row)
    for row in unified:
        row['Normalized Provider'] = norm(row['Company / Provider'])
        row['Normalized Program'] = norm(row['Program Name'])
        key='|'.join([row['Normalized Provider'],row['Normalized Program']])
        row['Duplicate Group Key']=key
        row['Duplicate Count']=len(groups[key])
        row['Needs Duplicate Review']='Yes' if len(groups[key])>1 else 'No'
    return unified

def duplicate_review(unified):
    out=[]
    for i,a in enumerate(unified):
        for j,b in enumerate(unified):
            if j<=i: continue
            if a['Duplicate Group Key']==b['Duplicate Group Key']:
                reason='Same normalized provider + program'
                score=1.0
            else:
                ua=tokens(a['Program Name']); ub=tokens(b['Program Name'])
                score=len(ua&ub)/max(1,len(ua|ub))
                same_url=bool(
                    a.get('Official Program URL','').startswith('https://')
                    and a.get('Official Program URL') == b.get('Official Program URL')
                )
                same_provider=norm(a['Company / Provider'])==norm(b['Company / Provider'])
                # Keep fuzzy suggestions conservative: generic words such as
                # "startup", "cloud", or "program" are not enough by themselves.
                name_contains = bool(ua and ub and (ua <= ub or ub <= ua))
                if same_url or (same_provider and score>=0.85 and name_contains):
                    reason=('Same official URL' if same_url else 'Same provider + similar program name')
                else: continue
            out.append({'Record A':a['Unified ID'],'Program A':a['Program Name'],'Provider A':a['Company / Provider'],'Record B':b['Unified ID'],'Program B':b['Program Name'],'Provider B':b['Company / Provider'],'Similarity Score':round(score,3),'Reason':reason,'Review Decision':'Pending'})
    return out

def promo_registry(unified):
    rows=[]
    for r in unified:
        code=r.get('Promo / Referral Code','')
        status=r.get('Repo Coupon Status','') or ('No code captured in Excel' if r['Source Presence']=='Excel only' else '')
        if code or status:
            rows.append({'Unified ID':r['Unified ID'],'Provider':r['Company / Provider'],'Program':r['Program Name'],'Promo / Referral Status':status,'Promo / Referral Code':code,'Promo / Referral URL':r.get('Promo / Referral Source',''),'Application / Redemption URL':r.get('Application URL','') or r.get('Redemption URL',''),'Source Presence':r['Source Presence'],'Last Verified':r.get('Last Verified Date',''),'Notes':r.get('Promo / Referral Notes','') or 'No code recorded; application or partner referral may be required.'})
    return rows

def write_csv(path, rows):
    path.parent.mkdir(parents=True, exist_ok=True)
    headers=list(rows[0].keys()) if rows else []
    with path.open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=headers); w.writeheader(); w.writerows(rows)

def add_sheet(wb, title, rows, tab_color='1F4E78'):
    ws=wb.create_sheet(title)
    if not rows: return ws
    headers=list(rows[0].keys())
    ws.append(headers)
    for row in rows: ws.append([row.get(h,'') for h in headers])
    ws.freeze_panes='A2'; ws.auto_filter.ref=ws.dimensions; ws.sheet_properties.tabColor=tab_color
    for cell in ws[1]:
        cell.font=Font(bold=True,color='FFFFFF'); cell.fill=PatternFill('solid',fgColor=tab_color); cell.alignment=Alignment(wrap_text=True,vertical='top')
    for row in ws.iter_rows(min_row=2):
        for c in row: c.alignment=Alignment(wrap_text=True,vertical='top')
    for i,h in enumerate(headers,1):
        max_len=min(45,max(12,len(str(h)),max((len(str(ws.cell(r,i).value or '')) for r in range(2,min(ws.max_row,30)+1)),default=0)))
        ws.column_dimensions[get_column_letter(i)].width=max_len
    if ws.max_row>=2:
        ref=f'A1:{get_column_letter(ws.max_column)}{ws.max_row}'
        name=re.sub(r'[^A-Za-z0-9_]','',title)[:20] or 'Table'
        tab=Table(displayName=name+'Table',ref=ref); tab.tableStyleInfo=TableStyleInfo(name='TableStyleMedium2',showRowStripes=True,showColumnStripes=False)
        ws.add_table(tab)
    return ws

def main():
    excel_rows=load_excel_master(); repo_rows=load_repo(); unified=build_rows(excel_rows,repo_rows); dupes=duplicate_review(unified); promo=promo_registry(unified)
    write_csv(OUT_CSV,unified); write_csv(OUT_PROMO,promo)
    OUT_JSON.write_text(json.dumps({'generated_on':TODAY,'counts':{'excel_master':len(excel_rows),'repo_catalog':len(repo_rows),'unified':len(unified),'duplicate_reviews':len(dupes),'promo_registry':len(promo)},'programs':unified},ensure_ascii=False,indent=2),encoding='utf-8')
    wb=openpyxl.load_workbook(EXCEL_SOURCE)
    # remove prior generated sheets if rerun
    for title in ['Unified Programs','Promo & Referral','Duplicate Review','Repo Inventory','Field Guide']:
        if title in wb.sheetnames: del wb[title]
    add_sheet(wb,'Unified Programs',unified,'1F4E78')
    add_sheet(wb,'Promo & Referral',promo,'C65911')
    add_sheet(wb,'Duplicate Review',dupes,'8064A2')
    inventory=[
      {'Source Type':'Excel attachment','Path':'/home/ubuntu/upload/Global_Startup_Grants_AI_Credits_SaaS_Benefits.xlsx','Rows Included':len(excel_rows),'Role':'Master Database and supporting sheets'},
      {'Source Type':'GitHub repository','Path':'programs.csv','Rows Included':len(repo_rows),'Role':'Canonical repo program catalog'},
      {'Source Type':'GitHub repository','Path':'data/catalog.csv','Rows Included':'same catalog snapshot','Role':'Generated/duplicate catalog source'},
      {'Source Type':'GitHub repository','Path':'data/coupons.md','Rows Included':'coupon registry','Role':'Provider code and referral-source notes'},
      {'Source Type':'GitHub repository','Path':'global/*.md; categories/*.md; china/**/*.md; ukraine/*.md','Rows Included':'supporting docs','Role':'Context and evidence documents not flattened into program rows'},
    ]
    add_sheet(wb,'Repo Inventory',inventory,'70AD47')
    guide=[
      {'Field':'Source Presence','Meaning':'Excel only, GitHub repo only, or both sources matched.'},
      {'Field':'Needs Duplicate Review','Meaning':'Yes when normalized provider + program key is shared by more than one row.'},
      {'Field':'Promo / Referral Code','Meaning':'Provider-published code captured in the repo. Blank means no code captured; do not infer a private code.'},
      {'Field':'Repo Coupon Status','Meaning':'The repo registry status. "No public code verified" is not proof that private partner codes do not exist.'},
      {'Field':'Duplicate Review','Meaning':'Potential exact or conservative fuzzy duplicates; review before deleting or merging.'},
      {'Field':'Verification Confidence','Meaning':'Preserved from Excel where available; repo-only rows are labeled as GitHub repository source.'},
      {'Field':'Filtering tip','Meaning':'Use Excel table filters on Source Presence, Program Status, Available to Egypt-Based Startups?, Benefit Type, Verification Confidence, Promo / Referral Code, and Needs Duplicate Review.'},
    ]
    add_sheet(wb,'Field Guide',guide,'A5A5A5')
    wb.save(OUT_XLSX)
    print(json.dumps({'excel_master':len(excel_rows),'repo_catalog':len(repo_rows),'unified':len(unified),'duplicate_reviews':len(dupes),'promo_registry':len(promo),'output':str(OUT_XLSX)},ensure_ascii=False))

if __name__=='__main__': main()
