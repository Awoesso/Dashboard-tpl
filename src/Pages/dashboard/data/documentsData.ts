/**
 * Documents/Products data for dashboard table
 */

export interface DocumentItem {
  id: string;
  name: string;
  category: string;
  earnings: number;
  downloads: number;
  status: 'active' | 'inactive' | 'pending';
}

export const documentsData: DocumentItem[] = [
  {
    id: "doc-001",
    name: "Advanced TypeScript Guide",
    category: "Programming",
    earnings: 12500,
    downloads: 145,
    status: "active",
  },
  {
    id: "doc-002",
    name: "React Best Practices",
    category: "Web Development",
    earnings: 18900,
    downloads: 234,
    status: "active",
  },
  {
    id: "doc-003",
    name: "Python Data Science",
    category: "Data Science",
    earnings: 9800,
    downloads: 89,
    status: "active",
  },
  {
    id: "doc-004",
    name: "Cloud Architecture Basics",
    category: "Infrastructure",
    earnings: 15600,
    downloads: 112,
    status: "pending",
  },
  {
    id: "doc-005",
    name: "Web Security Essentials",
    category: "Security",
    earnings: 8400,
    downloads: 67,
    status: "active",
  },
];
