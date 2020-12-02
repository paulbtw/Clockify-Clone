export interface timeEntriesInterface {
	id: string;
	description: string;
	billable: boolean;
	start: string;
	end: string | null;
	duration: number | null;
	isLocked: boolean;
	userId: string;
	workspaceId: string;
	projectId: string | null;
	tagId: string | null;
}
