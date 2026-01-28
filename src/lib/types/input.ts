import type { KeyInput } from "./key_input";

export interface InputResponse {
    id: number;
    location_room: number;
    address: number;
    cat6_branch: number;
    inputs: Array<KeyInput>
}