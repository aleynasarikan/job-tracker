export interface Application {
    id: string;
    company: string;
    position: string;
    link: string;
    date: Date;
    status: Status;

}
export type Status = "Başvuruldu" | "Mülakat" | "Reddedildi" | "Teklif"
export const STATUSES: Status[] = ["Başvuruldu", "Mülakat", "Reddedildi", "Teklif"]
