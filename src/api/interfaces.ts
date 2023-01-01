export interface Label {
  id: string;
  name: string;
  colour: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLabelReq {
  name: string;
  colour: string;
}

export interface LabelRes {
  label: Label;
  message: string;
}

export interface UpdateLabelReq {
  id: string;
  name: string;
  colour: string;
}

export interface LoginUserReq {
  email: string;
  password: string;
}

export interface RegisterUserReq {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserRes {
  user: {
    name: string;
    email: string;
  };
  message: string;
}

export interface LoginUserRes {
  user: {
    name: string;
    email: string;
    id: string;
  };
  message: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  labels: Label[];
}

export interface TaskHistory {
  name: string;
  description: string;
  completed: boolean;
  labels: Label[];
}

export interface CreateTaskReq {
  name: string;
  description: string;
}

export interface UpdateTaskReq {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

export interface TaskLabelsReq {
  id: string;
  labels: string[];
}
