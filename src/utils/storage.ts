import { Application } from "../interfaces/Application";


const KEY = "applications"

export const getApplications = (): Application[] => {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];


}
export const saveApplications = (applications: Application[]) => {
    localStorage.setItem(KEY, JSON.stringify(applications));
}

