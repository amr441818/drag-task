


export type taskType = {
  id: string;
  title: string;  
  status:string;
};

export type ActionPayload = {
  id: string;
  tasks: taskType[];
};
export type addTask = {
  id: string;
  task: taskType ;
};
export type projectType = {
  id: string;
  title: string;
  descreption: string;
  tasks: taskType[],
}
export type formLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

//components / reusableComponents/ mainPageCard
export type MainCardProps = {
  children: React.ReactNode;
};
export type Mainlist = {
  children?: React.ReactNode;
  title?: string;
};

interface Pagination {
  total: number;
  last_page: number;
  per_page: number;
  current_page: number;
}
export type tabelProps = {
  tabelHead: any[];
  TableBody: any[];
  allCols?: string[];
  isLoading?: { [key: number]: boolean };
  isLoadingDelivery?: { [key: number]: boolean };
  Link_Navigation?: string;
  Chcekbox?: boolean;
  Page_Add?: boolean;
  showAddButton?: boolean;
  Enabel_delete?: boolean;
  Accept_button?: boolean;
  Reject_button?: boolean;
  Enabel_edit?: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onUpdate: (id: string, status: string) => void;
  onUpdateDelivery?: (id: string, status: boolean) => void;
  pagination?: Pagination;
  setPage: (page: number) => void;
  page: number;
  openCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
};

//components / reusableComponents/ inputComponnent
export type customInputProps = {
  label: string;
  labelLang?: string;
  type: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
};
//components / reusableComponents/ NumberInput

export type customNumbersInputProps = {
  value: string;

  onChange: (value: string) => void;
  required?: boolean;
};

//components / reusableComponents/ customSelect
export type customSelectProps = {
  options: { value: any; label: string }[];
  label?: string;
  onChange: (value: string) => void; // Add this prop
};
export type customAnySelectProps = {
  label?: string;
  type: string;
  id?: string;
  onChange: (value: number) => void; // Add this prop
};
export type ModalProps = {
  children: React.ReactNode;
  title?: string;
  openCloseModal?: React.Dispatch<React.SetStateAction<boolean>>;
 
};
