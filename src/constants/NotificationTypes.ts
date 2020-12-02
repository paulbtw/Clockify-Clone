export enum NotificationType {
	USER_SETTINGS = 'USER_SETTINGS',
	ACCOUNT_VERIFICATION = 'ACCOUNT_VERIFICATION',
	WORKSPACE_INVITATION = 'WORKSPACE_INVITATION',
}

interface NotificationDataBase {
	id: string;
	type: NotificationType;
}

export interface INotificationInvite extends NotificationDataBase {
	creation: string | Date;
	invitationCode: null | string;
	invitedBy: string;
	workspaceId: string;
	workspaceName: string;
	isUsingFullAccess: boolean;
	usingFullAccess: boolean;
}

export interface INotificationMessage extends NotificationDataBase {
	email: string;
}
