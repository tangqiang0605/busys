export enum RequestType {
  timer = '定期维护',
  special = '上报检修',
}

export enum MaintenanceType {
  station = 'station',
  vehicle = 'vehicle',
  facility = 'facilities',
}

export enum ApprovalStatus {
  approval = '审批中',
  allowed = '审批通过',
  rejected = '审批拒绝',
}
