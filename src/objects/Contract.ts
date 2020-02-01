import { TireType, EngineType, PaintJobType, WindowType, DoorType } from "./sprites/Cards/CardType";


export class Contract {

    public reqTires: Array<TireType>;
    public reqEngine: EngineType;
    public reqPaintJob: PaintJobType;
    public reqWindows: Array<WindowType>;
    public reqDoor: Array<DoorType>;

}