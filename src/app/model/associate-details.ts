export interface AssociateDetails {
    associateId: string;
    email: string;
    mobile: string;
    name: string;
    userId: string;
    skills: Skill[];
}
export interface Skill {
    level: string;
    name: string;
    type: string;
}