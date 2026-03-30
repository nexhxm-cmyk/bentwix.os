'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';

type Project = {
  id: string;
  name: string;
  client: string;
  status: 'active' | 'completed' | 'on hold';
  budget: number;
  spent: number;
  progress: number;
};

type Task = { id: string; title: string; description: string; status: 'todo' | 'in-progress' | 'in-review' | 'done' };

type Client = { id: string; name: string; email: string; status: 'active' | 'inactive'; revenue: number; projects: number };

type Deal = { id: string; title: string; client: string; value: number; stage: 'prospecting' | 'negotiation' | 'proposal' | 'won' | 'lost' };

type PayrollRecord = { id: string; employee: string; salary: number; commission: number; bonus: number; total: number };

type Contract = { id: string; name: string; client: string; status: 'active' | 'pending' | 'signed'; startDate: string; endDate: string };

type Invoice = { id: string; number: string; client: string; amount: number; status: 'paid' | 'pending' | 'draft'; issue: string; due: string };

type Message = { id: string; author: string; message: string; timestamp: string; channel: string; type: 'team' | 'client' };

type DataContextValue = {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  tasks: Record<string, Task[]>;
  addTask: (task: Omit<Task,'id'>) => void;
  moveTask: (taskId: string, from: string, to: string) => void;
  clients: Client[];
  addClient: (client: Omit<Client,'id'>) => void;
  deals: Deal[];
  addDeal: (deal: Omit<Deal,'id'>) => void;
  moveDeal: (dealId: string, toStage: Deal['stage']) => void;
  payroll: PayrollRecord[];
  addPayrollRecord: (record: Omit<PayrollRecord,'id' | 'total'>) => void;
  contracts: Contract[];
  addContract: (contract: Omit<Contract,'id'>) => void;
  invoices: Invoice[];
  addInvoice: (invoice: Omit<Invoice,'id'>) => void;
  updateInvoiceStatus: (invoiceId: string, status: Invoice['status']) => void;
  reports: { exportCSV: () => void; };
  channels: string[];
  activeChannel: string;
  setActiveChannel: (channel: string) => void;
  messages: Message[];
  sendMessage: (message: string, type: 'team' | 'client') => void;
};

const DashboardContext = createContext<DataContextValue | null>(null);

const initialProjects: Project[] = [
  { id: '1', name: 'Website Redesign', client: 'Acme Corp', status: 'active', budget: 15000, spent: 9200, progress: 65 },
  { id: '2', name: 'Mobile App', client: 'Tech Startup', status: 'active', budget: 30000, spent: 18500, progress: 45 },
  { id: '3', name: 'Brand Identity', client: 'Digital Agency', status: 'completed', budget: 5000, spent: 5000, progress: 100 },
];

const initialTaskBoard: Record<string, Task[]> = {
  todo: [
    { id: '1', title: 'Design landing page', description: 'Create mockups and wireframes', status: 'todo' },
    { id: '2', title: 'Research competitors', description: 'Analyze market positioning', status: 'todo' },
  ],
  'in-progress': [
    { id: '3', title: 'Setup authentication', description: 'Implement Supabase auth', status: 'in-progress' },
    { id: '4', title: 'Create database schema', description: 'Design tables and relationships', status: 'in-progress' },
  ],
  'in-review': [
    { id: '5', title: 'API implementation', description: 'REST endpoints', status: 'in-review' },
  ],
  done: [
    { id: '6', title: 'Project kickoff', description: 'Team meeting', status: 'done' },
    { id: '7', title: 'Requirement gathering', description: 'Client feedback', status: 'done' },
  ],
};

const initialClients: Client[] = [
  { id: '1', name: 'Acme Corp', email: 'contact@acme.com', status: 'active', revenue: 12500, projects: 3 },
  { id: '2', name: 'Tech Startup', email: 'hello@techstartup.com', status: 'active', revenue: 8200, projects: 2 },
  { id: '3', name: 'Digital Agency', email: 'info@digitalagency.com', status: 'active', revenue: 15000, projects: 4 },
  { id: '4', name: 'Creative Co', email: 'contact@creative.co', status: 'inactive', revenue: 5000, projects: 1 },
];

const initialDeals: Deal[] = [
  { id: '1', title: 'Startup Alpha', client: 'Acme Corp', value: 50000, stage: 'prospecting' },
  { id: '2', title: 'Company Beta', client: 'Tech Startup', value: 35000, stage: 'prospecting' },
  { id: '3', title: 'Gamma Corp', client: 'Digital Agency', value: 120000, stage: 'negotiation' },
  { id: '4', title: 'Delta Inc', client: 'New client', value: 80000, stage: 'proposal' },
  { id: '5', title: 'Epsilon Ltd', client: 'Creative Co', value: 45000, stage: 'proposal' },
  { id: '6', title: 'Zeta Industries', client: 'Acme Corp', value: 150000, stage: 'won' },
  { id: '7', title: 'Eta Systems', client: 'Tech Startup', value: 95000, stage: 'won' },
];

const initialPayroll: PayrollRecord[] = [
  { id: '1', employee: 'John Smith', salary: 5000, commission: 500, bonus: 200, total: 5700 },
  { id: '2', employee: 'Sarah Chen', salary: 4500, commission: 800, bonus: 150, total: 5450 },
  { id: '3', employee: 'Mike Johnson', salary: 4000, commission: 300, bonus: 100, total: 4400 },
  { id: '4', employee: 'Elena Davis', salary: 4500, commission: 600, bonus: 200, total: 5300 },
];

const initialContracts: Contract[] = [
  { id: '1', name: 'Service Agreement - Acme Corp', client: 'Acme Corp', status: 'active', startDate: '2026-01-15', endDate: '2027-01-15' },
  { id: '2', name: 'Development Contract - Tech Startup', client: 'Tech Startup', status: 'pending', startDate: '2026-04-01', endDate: '2026-09-30' },
  { id: '3', name: 'NDA - Digital Agency', client: 'Digital Agency', status: 'signed', startDate: '2026-02-20', endDate: '2027-02-20' },
  { id: '4', name: 'Retainer Agreement - Creative Co', client: 'Creative Co', status: 'active', startDate: '2025-06-01', endDate: '2026-05-31' },
];

const initialInvoices: Invoice[] = [
  { id: '1', number: 'INV-001', client: 'Acme Corp', amount: 2500, status: 'paid', issue: '2026-03-15', due: '2026-04-15' },
  { id: '2', number: 'INV-002', client: 'Tech Startup', amount: 1200, status: 'pending', issue: '2026-03-20', due: '2026-04-20' },
  { id: '3', number: 'INV-003', client: 'Digital Agency', amount: 3500, status: 'draft', issue: '2026-03-25', due: '2026-04-25' },
  { id: '4', number: 'INV-004', client: 'Creative Co', amount: 2000, status: 'paid', issue: '2026-03-10', due: '2026-04-10' },
];

const initialMessages: Message[] = [
  { id: '1', author: 'John Smith', message: 'Hey team, project kickoff is tomorrow at 10 AM', timestamp: '10:30 AM', channel: 'projects', type: 'team' },
  { id: '2', author: 'Sarah Chen', message: "Got it! I'll prepare the requirements document", timestamp: '10:35 AM', channel: 'projects', type: 'team' },
  { id: '3', author: 'Mike Johnson', message: 'Count me in! See you then', timestamp: '10:40 AM', channel: 'projects', type: 'team' },
  { id: '4', author: 'John Smith', message: "Perfect, let's make it great!", timestamp: '10:42 AM', channel: 'projects', type: 'team' },
];

function randomId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Record<string, Task[]>>(initialTaskBoard);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [payroll, setPayroll] = useState<PayrollRecord[]>(initialPayroll);
  const [contracts, setContracts] = useState<Contract[]>(initialContracts);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [activeChannel, setActiveChannel] = useState('projects');
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const addProject = (project: Omit<Project, 'id'>) => {
    setProjects(prev => [...prev, { ...project, id: randomId() }]);
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    setTasks(prev => ({ ...prev, todo: [...prev.todo, { ...task, id: randomId() }] }));
  };

  const moveTask = (taskId: string, from: string, to: string) => {
    setTasks(prev => {
      const source = prev[from] || [];
      const target = prev[to] || [];
      const task = source.find(item => item.id === taskId);
      if (!task) return prev;
      return {
        ...prev,
        [from]: source.filter(item => item.id !== taskId),
        [to]: [...target, { ...task, status: to as Task['status'] }],
      };
    });
  };

  const addClient = (client: Omit<Client, 'id'>) => {
    setClients(prev => [...prev, { ...client, id: randomId() }]);
  };

  const addDeal = (deal: Omit<Deal, 'id'>) => {
    setDeals(prev => [...prev, { ...deal, id: randomId() }]);
  };

  const moveDeal = (dealId: string, toStage: Deal['stage']) => {
    setDeals(prev =>
      prev.map(deal => (deal.id === dealId ? { ...deal, stage: toStage } : deal))
    );
  };

  const addPayrollRecord = (record: Omit<PayrollRecord, 'id' | 'total'>) => {
    const total = record.salary + record.commission + record.bonus;
    setPayroll(prev => [...prev, { ...record, id: randomId(), total }]);
  };

  const addContract = (contract: Omit<Contract, 'id'>) => {
    setContracts(prev => [...prev, { ...contract, id: randomId() }]);
  };

  const addInvoice = (invoice: Omit<Invoice, 'id'>) => {
    setInvoices(prev => [...prev, { ...invoice, id: randomId() }]);
  };

  const updateInvoiceStatus = (invoiceId: string, status: Invoice['status']) => {
    setInvoices(prev => prev.map(inv => (inv.id === invoiceId ? { ...inv, status } : inv)));
  };

  const exportCSV = () => {
    const header = 'type,name,value\n';
    const rows = [
      ...clients.map(c => `client,${c.name},${c.revenue}`),
      ...deals.map(d => `deal,${d.title},${d.value}`),
      ...projects.map(p => `project,${p.name},${p.budget}`),
    ];
    const csv = header + rows.join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bentwix-data-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendMessage = (messageText: string, type: 'team' | 'client') => {
    if (!messageText.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: randomId(),
        author: 'You',
        message: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        channel: activeChannel,
        type,
      },
    ]);
  };

  const value = useMemo(() => ({
    projects,
    addProject,
    tasks,
    addTask,
    moveTask,
    clients,
    addClient,
    deals,
    addDeal,
    moveDeal,
    payroll,
    addPayrollRecord,
    contracts,
    addContract,
    invoices,
    addInvoice,
    updateInvoiceStatus,
    reports: { exportCSV },
    channels: ['general', 'projects', 'announcements', 'random'],
    activeChannel,
    setActiveChannel,
    messages,
    sendMessage,
  }), [
    projects,
    tasks,
    clients,
    deals,
    payroll,
    contracts,
    invoices,
    activeChannel,
    messages,
  ]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
}
