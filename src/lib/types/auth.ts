export interface AuthRequest {
	username: string;
	password: string;
}

export type AuthResult = {
	token: string;
	user: {
		id: number;
		username: string;
		email: string;
		user_role: string;
		accessible_projects: {
			id: number;
			name: string;
			role: string;
			permissions: {
				can_edit_scenes: boolean;
				can_edit_key_actions: boolean;
				can_edit_hardware: boolean;
			};
		}[];
	};
};
