export interface IWorkspace {
	id: string;
	name: string;
	imageUrl: string;
	features: null;
	hourlyRate: {
		amount: number;
		currency: string;
	};
	costRate: {
		amoun: number;
		currency: string;
	};
	workspaceSettings: {
		[key: string]: any;
	};
	round: {
		round: string;
		minutes: number;
	};
	featureSubscriptionType: null;
	onSubdomain: boolean;
	members: {
		id: string;
		membershipStatus: string;
		membershipType: string;
		hourlyRate: { amount: number; currency: string };
		permissions: string;
		usersId: string;
		workspaceId: string;
	}[];
}
