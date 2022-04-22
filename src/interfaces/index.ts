// Declaring common typescript interfaces here

export type FormControlElement = HTMLInputElement
  | HTMLSelectElement | HTMLTextAreaElement

type NotificationType = 'success' | 'danger' | ''

export interface Notification {
    message: string,
    type: NotificationType,
}
