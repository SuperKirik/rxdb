import { Observable } from 'rxjs';
import type { BroadcastChannel, LeaderElector } from 'broadcast-channel';
import type { BulkWriteLocalRow, LokiDatabaseSettings, LokiLocalDatabaseState, LokiRemoteRequestBroadcastMessage, LokiRemoteResponseBroadcastMessage, LokiSettings, LokiStorageInternals, RxKeyObjectStorageInstanceCreationParams, RxLocalDocumentData, RxLocalStorageBulkWriteResponse, RxStorageChangeEvent, RxStorageKeyObjectInstance } from '../../types';
import { IdleQueue } from 'custom-idle-queue';
export declare class RxStorageKeyObjectInstanceLoki implements RxStorageKeyObjectInstance<LokiStorageInternals, LokiSettings> {
    readonly databaseName: string;
    readonly collectionName: string;
    readonly internals: LokiStorageInternals;
    readonly options: Readonly<LokiSettings>;
    readonly databaseSettings: LokiDatabaseSettings;
    readonly idleQueue: IdleQueue;
    readonly broadcastChannel?: BroadcastChannel<LokiRemoteRequestBroadcastMessage | LokiRemoteResponseBroadcastMessage> | undefined;
    private changes$;
    readonly leaderElector?: LeaderElector;
    instanceId: number;
    private closed;
    constructor(databaseName: string, collectionName: string, internals: LokiStorageInternals, options: Readonly<LokiSettings>, databaseSettings: LokiDatabaseSettings, idleQueue: IdleQueue, broadcastChannel?: BroadcastChannel<LokiRemoteRequestBroadcastMessage | LokiRemoteResponseBroadcastMessage> | undefined);
    private getLocalState;
    /**
     * If the local state must be used, that one is returned.
     * Returns false if a remote instance must be used.
     */
    mustUseLocalState(): Promise<LokiLocalDatabaseState | false>;
    private requestRemoteInstance;
    bulkWrite<RxDocType>(documentWrites: BulkWriteLocalRow<RxDocType>[]): Promise<RxLocalStorageBulkWriteResponse<RxDocType>>;
    findLocalDocumentsById<RxDocType = any>(ids: string[]): Promise<Map<string, RxLocalDocumentData<RxDocType>>>;
    changeStream(): Observable<RxStorageChangeEvent<RxLocalDocumentData<{
        [key: string]: any;
    }>>>;
    close(): Promise<void>;
    remove(): Promise<void>;
}
export declare function createLokiKeyValueLocalState(params: RxKeyObjectStorageInstanceCreationParams<LokiSettings>, databaseSettings: LokiDatabaseSettings): Promise<LokiLocalDatabaseState>;
export declare function createLokiKeyObjectStorageInstance(params: RxKeyObjectStorageInstanceCreationParams<LokiSettings>, databaseSettings: LokiDatabaseSettings): Promise<RxStorageKeyObjectInstanceLoki>;
