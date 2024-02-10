export enum PAGE_ROUTES {
  HOME = "/",
  WALLET_LIST = "/wallets",
  TRANSACTION_LIST = "/transactions",
  PAGE_NOT_FOUND = "/not-found",
}

export enum IconSize {
  SMALL = "s",
  MEDIUM = "m",
  LARGE = "l",
  EXTRA_LARGE = "xl",
  HUGE = "xxl",
}

export enum CELL_TYPE {
  TEXT = "text",
  AMOUNT = "amount",
  STATUS = "status",
  ICON_STATUS = "statusWithIcon",
  ICON = "icon",
  DATE_TIME_STAMP = "dateTimeStamp",
  ACTIONS = "actions",
}

export enum INPUT_TYPE {
  TEXT = "text",
  LONG_TEXT = "textarea",
}

export enum SYNC_STATUS {
  PENDING = "pending",
  COMPLETED = "completed",
}

export enum SYNC_TYPE {
  BALANCE = "balance",
  TRANSACTION_HISTORY = "history",
}
