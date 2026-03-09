import { AppStatus } from "../model/AppStatus.js";


export async function getStatusUseCase(): Promise<AppStatus> {
    return new AppStatus()
}