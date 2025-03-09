import { DetailsList } from './details-list.model';
import { GridSettings } from './grid-settings.model';

export class RequestData<T>
{
    entity: T;
    entityList: Array<T>;
    detailLists: Array<DetailsList>;
    gridSettings: GridSettings;
}
