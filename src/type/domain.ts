export enum Status {
  CONNECTED = "Đã kết nối",
  CONNECTING = "Đang kết nối",
  FAILED = "Thất bại",
}

export interface Domain {
  id: number;
  name: string;
  status: Status;
  createdOn: string;
  content: string;
}
