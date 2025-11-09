import { AppStatus } from '../data/AppStatus.ts'

export async function getStatusUseCase(): Promise<AppStatus> {
    return new AppStatus()
}