import { AppStatus } from "../model/AppStatus.ts";


export async function getStatusUseCase(): Promise<AppStatus> {
    return new AppStatus()
}