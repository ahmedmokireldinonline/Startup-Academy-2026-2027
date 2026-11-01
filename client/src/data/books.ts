export type AcademyBook = {
  id: string;
  title: string;
  author: string;
  image: string;
  pdfPath: string;
  importance: string;
  projects: string;
  tags: string[];
};

export type BookCatalog = {
  id: string;
  name: string;
  subtitle: string;
  books: AcademyBook[];
};

export const bookCatalogs: BookCatalog[] = [
  {
    "id": "business-models",
    "name": "كتالوج نماذج الأعمال وبناء المنتج",
    "subtitle": "أكثر من خمسين دليلًا أصليًا من مجلد Business Models - Super Guides Bundle لتصميم النموذج واختبار السوق والتوسع.",
    "books": [
      {
        "id": "d190dcd4be59",
        "title": "Business Models in the 20th vs 21st Centuries",
        "author": "Business Models Super Guides",
        "image": "/book-covers/d190dcd4be59.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/1.%20Business_Models_in_the_20th_vs_21st_Centuries-cicwum.pdf",
        "importance": "دليل عملي لفهم Business Models in the 20th vs 21st Centuries وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "38642c30b104",
        "title": "Consulting Business Models 1",
        "author": "Business Models Super Guides",
        "image": "/book-covers/38642c30b104.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/10.%20Consulting-Business-Models-1-ybvojn.pdf",
        "importance": "دليل عملي لفهم Consulting Business Models 1 وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "8e7c20458152",
        "title": "Fintech Business Models 2nd edition",
        "author": "Business Models Super Guides",
        "image": "/book-covers/8e7c20458152.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/11.%20Fintech-Business-Models-2nd-edition-sgy2j0.pdf",
        "importance": "دليل عملي لفهم Fintech Business Models 2nd edition وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Finance",
          "Strategy"
        ]
      },
      {
        "id": "a326fb1ac294",
        "title": "Insurtech Business Model 2",
        "author": "Business Models Super Guides",
        "image": "/book-covers/a326fb1ac294.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/12.%20Insurtech-Business-Model-2-f5khsw.pdf",
        "importance": "دليل عملي لفهم Insurtech Business Model 2 وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "a8204898146d",
        "title": "Super Guide SaaS Business Model 4",
        "author": "Business Models Super Guides",
        "image": "/book-covers/a8204898146d.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/13.%20Super-Guide-SaaS-Business-Model-4-xnexrn.pdf",
        "importance": "دليل عملي لفهم Super Guide SaaS Business Model 4 وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "SaaS",
          "Strategy"
        ]
      },
      {
        "id": "556cb3d9fbfc",
        "title": "Subscription Business Model 3",
        "author": "Business Models Super Guides",
        "image": "/book-covers/556cb3d9fbfc.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/14.%20Subscription-Business-Model-3-69w1ze.pdf",
        "importance": "دليل عملي لفهم Subscription Business Model 3 وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "SaaS",
          "Strategy"
        ]
      },
      {
        "id": "d6c0726b36ec",
        "title": "EdTech Business Model",
        "author": "Business Models Super Guides",
        "image": "/book-covers/d6c0726b36ec.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/15.%20EdTech_Business_Model-q5nnpi.pdf",
        "importance": "دليل عملي لفهم EdTech Business Model وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "EdTech، الجامعات، التدريب، ومنصات التعلم.",
        "tags": [
          "EdTech",
          "Strategy"
        ]
      },
      {
        "id": "75716c1d7f85",
        "title": "HealthTech Business Model",
        "author": "Business Models Super Guides",
        "image": "/book-covers/75716c1d7f85.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/16.%20HealthTech-Business-Model-.pdf",
        "importance": "دليل عملي لفهم HealthTech Business Model وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "01baa89d1472",
        "title": "Minimum Viable Product MVP",
        "author": "Business Models Super Guides",
        "image": "/book-covers/01baa89d1472.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/17.%20Minimum-Viable-Product-MVP-txseve.pdf",
        "importance": "دليل عملي لفهم Minimum Viable Product MVP وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Product"
        ]
      },
      {
        "id": "55a398a40f27",
        "title": "Open Source Business Models 1",
        "author": "Business Models Super Guides",
        "image": "/book-covers/55a398a40f27.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/18.%20Open-Source-Business-Models-1-pcb773.pdf",
        "importance": "دليل عملي لفهم Open Source Business Models 1 وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "83ed66cb1bfa",
        "title": "Super Guide Pricing Strategies Tactics",
        "author": "Business Models Super Guides",
        "image": "/book-covers/83ed66cb1bfa.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/19.%20Super_Guide_Pricing_Strategies__Tactics-mqzuac.pdf",
        "importance": "دليل عملي لفهم Super Guide Pricing Strategies Tactics وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Business models"
        ]
      },
      {
        "id": "c6d1f50b26d8",
        "title": "Business Models Sides",
        "author": "Business Models Super Guides",
        "image": "/book-covers/c6d1f50b26d8.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/2.%20Business-Models-Sides-ghfpap.pdf",
        "importance": "دليل عملي لفهم Business Models Sides وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "c84331e7f5fa",
        "title": "As a Service Business Models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/c84331e7f5fa.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/20.%20As-a-Service_Business_Models.pdf",
        "importance": "دليل عملي لفهم As a Service Business Models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "81d66174a735",
        "title": "Long Tail Business Model",
        "author": "Business Models Super Guides",
        "image": "/book-covers/81d66174a735.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/21.%20Long-Tail-Business-Model-kzcjgo.pdf",
        "importance": "دليل عملي لفهم Long Tail Business Model وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Strategy"
        ]
      },
      {
        "id": "573f426adb79",
        "title": "Freemium business models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/573f426adb79.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/22.%20Freemium_business_models-zuxnur.pdf",
        "importance": "دليل عملي لفهم Freemium business models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "535d55b51230",
        "title": "Empathy Map",
        "author": "Business Models Super Guides",
        "image": "/book-covers/535d55b51230.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/23.%20Empathy_Map_-qs6h1o.pdf",
        "importance": "دليل عملي لفهم Empathy Map وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Business models"
        ]
      },
      {
        "id": "5b6ce1be2e97",
        "title": "Business Model Metrics",
        "author": "Business Models Super Guides",
        "image": "/book-covers/5b6ce1be2e97.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/24.%20Business_Model_Metrics-nh7lz7.pdf",
        "importance": "دليل عملي لفهم Business Model Metrics وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "c746a9057c43",
        "title": "Web3.0 Business Model",
        "author": "Business Models Super Guides",
        "image": "/book-covers/c746a9057c43.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/25.%20Web3.0-Business-Model-oyi2ud.pdf",
        "importance": "دليل عملي لفهم Web3.0 Business Model وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "cdfe70c649a0",
        "title": "Agritech Business Models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/cdfe70c649a0.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/26.%20Agritech-Business-Models-i7tfis.pdf",
        "importance": "دليل عملي لفهم Agritech Business Models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "1238f269503c",
        "title": "Super Guide Product Market Fit",
        "author": "Business Models Super Guides",
        "image": "/book-covers/1238f269503c.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/27.%20Super_Guide_Product_Market_Fit-javh8c.pdf",
        "importance": "دليل عملي لفهم Super Guide Product Market Fit وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Product"
        ]
      },
      {
        "id": "7a1d8ff0fb9c",
        "title": "Bundling and Unbundling Business Models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/7a1d8ff0fb9c.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/28.%20Bundling_and_Unbundling_Business_Models-hdm4mp.pdf",
        "importance": "دليل عملي لفهم Bundling and Unbundling Business Models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "1141ed79c173",
        "title": "Cost Models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/1141ed79c173.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/29.%20Cost_Models-ttnmxc.pdf",
        "importance": "دليل عملي لفهم Cost Models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Finance",
          "Strategy"
        ]
      },
      {
        "id": "bcabadebf335",
        "title": "Business Model Testing",
        "author": "Business Models Super Guides",
        "image": "/book-covers/bcabadebf335.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/3.%20Business_Model_Testing-voowm0.pdf",
        "importance": "دليل عملي لفهم Business Model Testing وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "9ef7e5054667",
        "title": "Decentralized Business Models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/9ef7e5054667.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/30.%20Decentralized_Business_Models-4oed1q.pdf",
        "importance": "دليل عملي لفهم Decentralized Business Models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "44f35c4ee629",
        "title": "Business Models Almanac The Big Book of Business Model Types",
        "author": "Business Models Super Guides",
        "image": "/book-covers/44f35c4ee629.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/31.%20Business-Models-Almanac-The-Big-Book-of-Business-Model-Types-pobplo.pdf",
        "importance": "دليل عملي لفهم Business Models Almanac The Big Book of Business Model Types وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "db81122e7103",
        "title": "Wealthtech Business Model",
        "author": "Business Models Super Guides",
        "image": "/book-covers/db81122e7103.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/32.%20Wealthtech_Business_Model.pdf",
        "importance": "دليل عملي لفهم Wealthtech Business Model وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "5ff628b3cb21",
        "title": "Super Guide Outsourcing Strategies",
        "author": "Business Models Super Guides",
        "image": "/book-covers/5ff628b3cb21.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/33.%20Super_Guide_Outsourcing_Strategies.pdf",
        "importance": "دليل عملي لفهم Super Guide Outsourcing Strategies وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Business models"
        ]
      },
      {
        "id": "6e04a0d1a7d3",
        "title": "Super Guide Real Estate Business Models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/6e04a0d1a7d3.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/34.%20Super_Guide_Real_Estate_Business_Models-jusy2e.pdf",
        "importance": "دليل عملي لفهم Super Guide Real Estate Business Models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "3be3fee2ade0",
        "title": "Google Business Model",
        "author": "Business Models Super Guides",
        "image": "/book-covers/3be3fee2ade0.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/35.%20Google_Business_Model-7bulcf.pdf",
        "importance": "دليل عملي لفهم Google Business Model وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "637d85fc053f",
        "title": "Distribution Strategies Tactics",
        "author": "Business Models Super Guides",
        "image": "/book-covers/637d85fc053f.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/36.%20Distribution_Strategies__Tactics.pdf",
        "importance": "دليل عملي لفهم Distribution Strategies Tactics وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Business models"
        ]
      },
      {
        "id": "3e5de105779b",
        "title": "Customer Relationship Strategies",
        "author": "Business Models Super Guides",
        "image": "/book-covers/3e5de105779b.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/37.%20Customer-Relationship-Strategies-83cvax.pdf",
        "importance": "دليل عملي لفهم Customer Relationship Strategies وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Marketing"
        ]
      },
      {
        "id": "96da5493b7c7",
        "title": "Foodtech Business Model",
        "author": "Business Models Super Guides",
        "image": "/book-covers/96da5493b7c7.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/38.%20Foodtech_Business_Model-fe04wg.pdf",
        "importance": "دليل عملي لفهم Foodtech Business Model وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "29617c61c4a0",
        "title": "Amazon Business Model",
        "author": "Business Models Super Guides",
        "image": "/book-covers/29617c61c4a0.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/39.%20Amazon-Business-Model-irpwq8.pdf",
        "importance": "دليل عملي لفهم Amazon Business Model وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "c7115ffd2994",
        "title": "Revenue Models 2nd edition",
        "author": "Business Models Super Guides",
        "image": "/book-covers/c7115ffd2994.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/4.%20Revenue-Models-2nd-edition-df5jsj.pdf",
        "importance": "دليل عملي لفهم Revenue Models 2nd edition وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Finance",
          "Strategy"
        ]
      },
      {
        "id": "37b4c8ab4208",
        "title": "Sales Tactics Strategies",
        "author": "Business Models Super Guides",
        "image": "/book-covers/37b4c8ab4208.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/40.%20Sales_Tactics__Strategies-2eonrw.pdf",
        "importance": "دليل عملي لفهم Sales Tactics Strategies وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Marketing"
        ]
      },
      {
        "id": "e856a6c02703",
        "title": "Super Guide Cost Reducing Strategies and Techniques",
        "author": "Business Models Super Guides",
        "image": "/book-covers/e856a6c02703.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/41.%20Super_Guide_Cost_Reducing_Strategies_and_Techniques-1dgdwg.pdf",
        "importance": "دليل عملي لفهم Super Guide Cost Reducing Strategies and Techniques وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Finance"
        ]
      },
      {
        "id": "268e656fcc9c",
        "title": "Strategy Planning Tools and Models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/268e656fcc9c.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/42.%20Strategy_Planning_Tools_and_Models.pdf",
        "importance": "دليل عملي لفهم Strategy Planning Tools and Models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "8a5d6ff84250",
        "title": "How Companies Make Money",
        "author": "Business Models Super Guides",
        "image": "/book-covers/8a5d6ff84250.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/43.%20How_Companies_Make_Money-yldxqv.pdf",
        "importance": "دليل عملي لفهم How Companies Make Money وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Finance"
        ]
      },
      {
        "id": "1785e6069b7b",
        "title": "Super Guide Mental Models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/1785e6069b7b.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/44.%20Super_Guide_Mental_Models-omnxhn.pdf",
        "importance": "دليل عملي لفهم Super Guide Mental Models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "fd87b33d2e33",
        "title": "Balanced Scorecard",
        "author": "Business Models Super Guides",
        "image": "/book-covers/fd87b33d2e33.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/45.%20Balanced_Scorecard-nxq9sa.pdf",
        "importance": "دليل عملي لفهم Balanced Scorecard وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Business models"
        ]
      },
      {
        "id": "e7f0c27a1a1d",
        "title": "Effective Brainstorming Techniques",
        "author": "Business Models Super Guides",
        "image": "/book-covers/e7f0c27a1a1d.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/46.%20Effective_Brainstorming_Techniques-1seats.pdf",
        "importance": "دليل عملي لفهم Effective Brainstorming Techniques وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI"
        ]
      },
      {
        "id": "32eef5be311a",
        "title": "The Perfect Business Plan",
        "author": "Business Models Super Guides",
        "image": "/book-covers/32eef5be311a.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/47.%20The_Perfect_Business_Plan-gftkhw.pdf",
        "importance": "دليل عملي لفهم The Perfect Business Plan وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "aaa12be48697",
        "title": "Customer Success Strategies",
        "author": "Business Models Super Guides",
        "image": "/book-covers/aaa12be48697.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/48.%20Customer_Success_Strategies-a0hmhm.pdf",
        "importance": "دليل عملي لفهم Customer Success Strategies وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Marketing"
        ]
      },
      {
        "id": "9057ae240447",
        "title": "The Perfect Marketing Plan",
        "author": "Business Models Super Guides",
        "image": "/book-covers/9057ae240447.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/49.%20The_Perfect_Marketing_Plan-rqkni5.pdf",
        "importance": "دليل عملي لفهم The Perfect Marketing Plan وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Marketing"
        ]
      },
      {
        "id": "59049accaa60",
        "title": "Transitional Business Models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/59049accaa60.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/5.%20Transitional_Business_Models-jrk3uy.pdf",
        "importance": "دليل عملي لفهم Transitional Business Models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "020f12a3e0ec",
        "title": "Competitive Analysis Strategies",
        "author": "Business Models Super Guides",
        "image": "/book-covers/020f12a3e0ec.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/50.%20Competitive_Analysis_Strategies-gmj5gq.pdf",
        "importance": "دليل عملي لفهم Competitive Analysis Strategies وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Business models"
        ]
      },
      {
        "id": "e13ab25f2e5c",
        "title": "Company Mission Statements",
        "author": "Business Models Super Guides",
        "image": "/book-covers/e13ab25f2e5c.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/51.%20Company_Mission_Statements-hadbjn.pdf",
        "importance": "دليل عملي لفهم Company Mission Statements وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Business models"
        ]
      },
      {
        "id": "95f9290edec4",
        "title": "Business Model Canvas Explained",
        "author": "Business Models Super Guides",
        "image": "/book-covers/95f9290edec4.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/52.%20Business_Model_Canvas_Explained-bhmuli.pdf",
        "importance": "دليل عملي لفهم Business Model Canvas Explained وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Strategy"
        ]
      },
      {
        "id": "f8732ec2d613",
        "title": "Exponential Business Models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/f8732ec2d613.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/53.%20Exponential_Business_Models-nwpxx3.pdf",
        "importance": "دليل عملي لفهم Exponential Business Models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "a0ddf395e3ab",
        "title": "Go to Market Strategies",
        "author": "Business Models Super Guides",
        "image": "/book-covers/a0ddf395e3ab.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/54.%20Go-to-Market_Strategies-px4w6a.pdf",
        "importance": "دليل عملي لفهم Go to Market Strategies وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Business models"
        ]
      },
      {
        "id": "bd3664383410",
        "title": "Business Model Evolution",
        "author": "Business Models Super Guides",
        "image": "/book-covers/bd3664383410.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/6.%20Business_Model_Evolution-nnzvdw.pdf",
        "importance": "دليل عملي لفهم Business Model Evolution وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "43bf642ad2eb",
        "title": "Network Effects",
        "author": "Business Models Super Guides",
        "image": "/book-covers/43bf642ad2eb.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/7.%20Network_Effects-queqlx.pdf",
        "importance": "دليل عملي لفهم Network Effects وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Business models"
        ]
      },
      {
        "id": "e0d962a869c8",
        "title": "Business Model Assessment",
        "author": "Business Models Super Guides",
        "image": "/book-covers/e0d962a869c8.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/8.%20Business_Model_Assessment-gvite2.pdf",
        "importance": "دليل عملي لفهم Business Model Assessment وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "e636e36c1928",
        "title": "Scalable Business Models",
        "author": "Business Models Super Guides",
        "image": "/book-covers/e636e36c1928.jpg",
        "pdfPath": "/pdf-library/Business%20Models%20-%20Super%20Guides%20Bundle/9.%20Scalable-Business-Models-zbrokl.pdf",
        "importance": "دليل عملي لفهم Scalable Business Models وتحويله إلى قرارات قابلة للتنفيذ داخل المشروع.",
        "projects": "الشركات الناشئة، SaaS، المنتجات الرقمية، وخطط التوسع.",
        "tags": [
          "Strategy"
        ]
      }
    ]
  },
  {
    "id": "business-explained",
    "name": "كتالوج الإدارة والـ AI والتنفيذ",
    "subtitle": "مجموعة Business Explained الكاملة لتطوير الإدارة والذكاء الاصطناعي والتسويق والعمليات داخل الشركة.",
    "books": [
      {
        "id": "b8635bb0266c",
        "title": "360 Degree Feedback Explained",
        "author": "Business Explained",
        "image": "/book-covers/b8635bb0266c.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/360-Degree-Feedback-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن 360 Degree Feedback Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI"
        ]
      },
      {
        "id": "95590b804539",
        "title": "Agile",
        "author": "Business Explained",
        "image": "/book-covers/95590b804539.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Agile-Manual-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Agile يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "الشركات المتوسطة، فرق المنتجات، والمشاريع المؤسسية.",
        "tags": [
          "Product"
        ]
      },
      {
        "id": "e9ae5543e24e",
        "title": "Artificial Intelligence Explained",
        "author": "Business Explained",
        "image": "/book-covers/e9ae5543e24e.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Artificial-Intelligence-EXPLAINED-by-Business-Explained-v6.pdf",
        "importance": "مرجع تطبيقي عن Artificial Intelligence Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI"
        ]
      },
      {
        "id": "33fe17b9c3b1",
        "title": "Brand Development Explained",
        "author": "Business Explained",
        "image": "/book-covers/33fe17b9c3b1.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Brand-Development-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Brand Development Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Marketing"
        ]
      },
      {
        "id": "84bde03d502f",
        "title": "Change Management Strategies Explained",
        "author": "Business Explained",
        "image": "/book-covers/84bde03d502f.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Change-Management-Strategies-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Change Management Strategies Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Operations"
        ]
      },
      {
        "id": "7e19a59282f2",
        "title": "Content Creation Wow Your",
        "author": "Business Explained",
        "image": "/book-covers/7e19a59282f2.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Content-Creation-Wow-Your-Audience-by-Success-Blueprints.pdf",
        "importance": "مرجع تطبيقي عن Content Creation Wow Your يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "الشركات المتوسطة، فرق المنتجات، والمشاريع المؤسسية.",
        "tags": [
          "Marketing"
        ]
      },
      {
        "id": "749f2b1c97e7",
        "title": "Customer Journey From Curious to",
        "author": "Business Explained",
        "image": "/book-covers/749f2b1c97e7.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Customer-Journey-From-Curious-to-Committed-by-Success-Blueprints-v2.pdf",
        "importance": "مرجع تطبيقي عن Customer Journey From Curious to يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "الشركات المتوسطة، فرق المنتجات، والمشاريع المؤسسية.",
        "tags": [
          "Marketing"
        ]
      },
      {
        "id": "b0a36970bc6e",
        "title": "Customer Relationship Explained",
        "author": "Business Explained",
        "image": "/book-covers/b0a36970bc6e.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Customer-Relationship-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Customer Relationship Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Marketing"
        ]
      },
      {
        "id": "669875393526",
        "title": "Cyber Security Explained",
        "author": "Business Explained",
        "image": "/book-covers/669875393526.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Cyber-Security-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Cyber Security Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI"
        ]
      },
      {
        "id": "81e8cadc070f",
        "title": "E commerce Explained",
        "author": "Business Explained",
        "image": "/book-covers/81e8cadc070f.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/E-commerce-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن E commerce Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI"
        ]
      },
      {
        "id": "8be9e45d9bcc",
        "title": "Employee Engagement Strategies Explained",
        "author": "Business Explained",
        "image": "/book-covers/8be9e45d9bcc.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Employee-Engagement-Strategies-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Employee Engagement Strategies Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Operations"
        ]
      },
      {
        "id": "d6a9b435c34d",
        "title": "Employee Retention Strategies The Art of Keeping",
        "author": "Business Explained",
        "image": "/book-covers/d6a9b435c34d.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Employee-Retention-Strategies-The-Art-of-Keeping-Talent-by-Success-Blueprints.pdf",
        "importance": "مرجع تطبيقي عن Employee Retention Strategies The Art of Keeping يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "الشركات المتوسطة، فرق المنتجات، والمشاريع المؤسسية.",
        "tags": [
          "Operations"
        ]
      },
      {
        "id": "6359365d7f87",
        "title": "Financial Crisis Explained",
        "author": "Business Explained",
        "image": "/book-covers/6359365d7f87.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Financial-Crisis-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Financial Crisis Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Finance"
        ]
      },
      {
        "id": "838e0df682fa",
        "title": "Financial Management Explained",
        "author": "Business Explained",
        "image": "/book-covers/838e0df682fa.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Financial-Management-EXPLAINED-by-Business-Explained-v5.pdf",
        "importance": "مرجع تطبيقي عن Financial Management Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Finance",
          "Operations"
        ]
      },
      {
        "id": "ac41e40ee0de",
        "title": "Housing Crisis Explained",
        "author": "Business Explained",
        "image": "/book-covers/ac41e40ee0de.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Housing-Crisis-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Housing Crisis Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI"
        ]
      },
      {
        "id": "681db2ddb8ee",
        "title": "Human Resources Management Explained",
        "author": "Business Explained",
        "image": "/book-covers/681db2ddb8ee.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Human-Resources-Management-EXPLAINED-by-Business-Explained-v4.pdf",
        "importance": "مرجع تطبيقي عن Human Resources Management Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Operations"
        ]
      },
      {
        "id": "0929977615c1",
        "title": "Kanban",
        "author": "Business Explained",
        "image": "/book-covers/0929977615c1.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Kanban-Manual-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Kanban يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "الشركات المتوسطة، فرق المنتجات، والمشاريع المؤسسية.",
        "tags": [
          "Product"
        ]
      },
      {
        "id": "c29a4aa77a8d",
        "title": "Kpi Mastery Measure What",
        "author": "Business Explained",
        "image": "/book-covers/c29a4aa77a8d.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Kpi-Mastery-Measure-What-Matters-by-Success-Blueprints.pdf",
        "importance": "مرجع تطبيقي عن Kpi Mastery Measure What يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "الشركات المتوسطة، فرق المنتجات، والمشاريع المؤسسية.",
        "tags": [
          "Management"
        ]
      },
      {
        "id": "3b966bca466b",
        "title": "Leadership Strategies Explained",
        "author": "Business Explained",
        "image": "/book-covers/3b966bca466b.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Leadership-Strategies-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Leadership Strategies Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI"
        ]
      },
      {
        "id": "a59306270590",
        "title": "Machine Learning Explained",
        "author": "Business Explained",
        "image": "/book-covers/a59306270590.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Machine-Learning-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Machine Learning Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "EdTech"
        ]
      },
      {
        "id": "c561fe73728a",
        "title": "Marketing Frameworks Explained",
        "author": "Business Explained",
        "image": "/book-covers/c561fe73728a.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Marketing-Frameworks-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Marketing Frameworks Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Marketing"
        ]
      },
      {
        "id": "743505243957",
        "title": "Negotiation Strategies and Techniques Explained",
        "author": "Business Explained",
        "image": "/book-covers/743505243957.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Negotiation-Strategies-and-Techniques-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Negotiation Strategies and Techniques Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI"
        ]
      },
      {
        "id": "60b7f8badac2",
        "title": "Negotiation Tactics Master the Art of the Deal",
        "author": "Business Explained",
        "image": "/book-covers/60b7f8badac2.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Negotiation-Tactics-Master-the-Art-of-the-Deal-by-Success-Blueprints.pdf",
        "importance": "مرجع تطبيقي عن Negotiation Tactics Master the Art of the Deal يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "الشركات المتوسطة، فرق المنتجات، والمشاريع المؤسسية.",
        "tags": [
          "Management"
        ]
      },
      {
        "id": "a45d4186a8c4",
        "title": "Organizational Management Explained",
        "author": "Business Explained",
        "image": "/book-covers/a45d4186a8c4.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Organizational-Management-Explained-by-Business-Explained-melwuq.pdf",
        "importance": "مرجع تطبيقي عن Organizational Management Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Operations"
        ]
      },
      {
        "id": "fca310d953de",
        "title": "Performance Management Strategies Explained",
        "author": "Business Explained",
        "image": "/book-covers/fca310d953de.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Performance-Management-Strategies-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Performance Management Strategies Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Operations"
        ]
      },
      {
        "id": "85102b8a42ab",
        "title": "Process Improvement Strategies Explained",
        "author": "Business Explained",
        "image": "/book-covers/85102b8a42ab.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Process-Improvement-Strategies-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Process Improvement Strategies Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Operations"
        ]
      },
      {
        "id": "6977dc8960a0",
        "title": "Process Improvement Success",
        "author": "Business Explained",
        "image": "/book-covers/6977dc8960a0.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Process-Improvement-Success-Stories-by-Success-Blueprints-v1.pdf",
        "importance": "مرجع تطبيقي عن Process Improvement Success يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "الشركات المتوسطة، فرق المنتجات، والمشاريع المؤسسية.",
        "tags": [
          "Operations"
        ]
      },
      {
        "id": "8ece88b7d210",
        "title": "Productivity Strategies Explained",
        "author": "Business Explained",
        "image": "/book-covers/8ece88b7d210.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Productivity-Strategies-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Productivity Strategies Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Product",
          "Operations"
        ]
      },
      {
        "id": "d4f3a281d0ed",
        "title": "Project Management Explained",
        "author": "Business Explained",
        "image": "/book-covers/d4f3a281d0ed.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Project-Management-Explained-by-Business-Explained-v4.pdf",
        "importance": "مرجع تطبيقي عن Project Management Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Product",
          "Operations"
        ]
      },
      {
        "id": "1afaa8565fac",
        "title": "Risk Management Explained",
        "author": "Business Explained",
        "image": "/book-covers/1afaa8565fac.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Risk-Management-EXPLAINED-v2.pdf",
        "importance": "مرجع تطبيقي عن Risk Management Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Operations"
        ]
      },
      {
        "id": "e623a9f0a739",
        "title": "Scrum",
        "author": "Business Explained",
        "image": "/book-covers/e623a9f0a739.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Scrum-Manual-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Scrum يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "الشركات المتوسطة، فرق المنتجات، والمشاريع المؤسسية.",
        "tags": [
          "Product"
        ]
      },
      {
        "id": "12fb64b8655a",
        "title": "Soft Skills Explained",
        "author": "Business Explained",
        "image": "/book-covers/12fb64b8655a.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Soft-Skills-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Soft Skills Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI"
        ]
      },
      {
        "id": "8504fe7f43f0",
        "title": "Strategic Management Explained",
        "author": "Business Explained",
        "image": "/book-covers/8504fe7f43f0.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Strategic-Management-Explained-by-Business-Explained-v3.pdf",
        "importance": "مرجع تطبيقي عن Strategic Management Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Strategy",
          "Operations"
        ]
      },
      {
        "id": "e53c9e9eb558",
        "title": "Strategic Success Vision to",
        "author": "Business Explained",
        "image": "/book-covers/e53c9e9eb558.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Strategic-Success-Vision-to-Victory-by-Success-Blueprints-v1.pdf",
        "importance": "مرجع تطبيقي عن Strategic Success Vision to يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "الشركات المتوسطة، فرق المنتجات، والمشاريع المؤسسية.",
        "tags": [
          "Strategy"
        ]
      },
      {
        "id": "7c4750ebe303",
        "title": "Talent Management Onboarding Explained",
        "author": "Business Explained",
        "image": "/book-covers/7c4750ebe303.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Talent-Management-Onboarding-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Talent Management Onboarding Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI",
          "Operations"
        ]
      },
      {
        "id": "f2ec667f148b",
        "title": "Team Harmony Collaborate",
        "author": "Business Explained",
        "image": "/book-covers/f2ec667f148b.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Team-Harmony-Collaborate-Conquer-by-Success-Blueprints.pdf",
        "importance": "مرجع تطبيقي عن Team Harmony Collaborate يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "الشركات المتوسطة، فرق المنتجات، والمشاريع المؤسسية.",
        "tags": [
          "Management"
        ]
      },
      {
        "id": "1847f9b83f43",
        "title": "Virtual Reality Explained",
        "author": "Business Explained",
        "image": "/book-covers/1847f9b83f43.jpg",
        "pdfPath": "/pdf-library/Business%20Explained/Virtual-Reality-EXPLAINED-by-Business-Explained-v2.pdf",
        "importance": "مرجع تطبيقي عن Virtual Reality Explained يساعد الفريق على تحسين التنفيذ والنمو واتخاذ قرارات أوضح.",
        "projects": "AI، الأتمتة، التحليلات، وتحول المؤسسات.",
        "tags": [
          "AI"
        ]
      }
    ]
  }
];
