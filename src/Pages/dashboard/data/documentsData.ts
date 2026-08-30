export type DocumentStatus = "Published" | "Draft";

export interface DocumentItem {
  id: string;
  name: string;
  image: string;
  price: number;
  downloads: number;
  earnings: number;
  status: DocumentStatus;
}

export const documentsData: DocumentItem[] = [
  {
    id: "doc-1",
    name: "CHM 112 - Lab Report Template",
    image: "/b.png",
    price: 1495,
    downloads: 12,
    earnings: 20930,
    status: "Published",
  },
  {
    id: "doc-2",
    name: "ECO 304 - Exam Prep Notes",
    image: "/b.png",
    price: 2990,
    downloads: 6,
    earnings: 17940,
    status: "Draft",
  },
  {
    id: "doc-3",
    name: "BIO 201 - Study Guide",
    image: "/b.png",
    price: 2490,
    downloads: 18,
    earnings: 44820,
    status: "Published",
  },
];