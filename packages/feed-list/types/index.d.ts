/// <reference types="node" />
import { Readable } from 'stream';
import { BaseBzz, BaseResponse, FeedID, FeedParams, FetchOptions } from '@erebos/api-bzz-base';
import { Hex, hexInput } from '@erebos/hex';
export declare const MAX_CHUNK_BYTE_LENGTH: number;
export declare const MAX_CHUNK_VALUE_LENGTH: number;
export interface ForwardsChunkIterator<T> extends AsyncIterator<T> {
    length: number;
}
export interface ChunkListReaderConfig<Bzz extends BaseBzz<BaseResponse, Readable> = BaseBzz<BaseResponse, Readable>> {
    bzz: Bzz;
    feed: FeedID | FeedParams;
    fetchOptions?: FetchOptions;
}
export declare class ChunkListReader<Bzz extends BaseBzz<BaseResponse, Readable> = BaseBzz<BaseResponse, Readable>> {
    bzz: Bzz;
    fetchOptions: FetchOptions;
    protected id: FeedID;
    constructor(config: ChunkListReaderConfig<Bzz>);
    load(index: number): Promise<Hex | null>;
    createBackwardsIterator(maxIndex: number, minIndex?: number): AsyncIterator<Hex | null>;
    createForwardsIterator(minIndex?: number, maxIndex?: number): ForwardsChunkIterator<Hex>;
}
export interface ChunkListWriterConfig<Bzz extends BaseBzz<BaseResponse, Readable> = BaseBzz<BaseResponse, Readable>> extends ChunkListReaderConfig<Bzz> {
    signParams?: any;
}
export declare class ChunkListWriter<Bzz extends BaseBzz<BaseResponse, Readable> = BaseBzz<BaseResponse, Readable>> extends ChunkListReader<Bzz> {
    protected signParams?: any;
    constructor(config: ChunkListWriterConfig<Bzz>);
    get length(): number;
    getID(): FeedID;
    push(data: hexInput): Promise<void>;
}
export declare class DataListReader<T = any, Bzz extends BaseBzz<BaseResponse, Readable> = BaseBzz<BaseResponse, Readable>> {
    protected chunkList: ChunkListReader<Bzz>;
    constructor(config: ChunkListReaderConfig<Bzz>);
    protected downloadData(hex: Hex): Promise<T>;
    load(index: number): Promise<T | null>;
    createBackwardsIterator(maxIndex: number, minIndex?: number): AsyncIterator<T | null>;
    createForwardsIterator(minIndex?: number, maxIndex?: number): ForwardsChunkIterator<T>;
}
export declare class DataListWriter<T = any, Bzz extends BaseBzz<BaseResponse, Readable> = BaseBzz<BaseResponse, Readable>> extends DataListReader<T, Bzz> {
    protected chunkList: ChunkListWriter<Bzz>;
    constructor(config: ChunkListWriterConfig<Bzz>);
    get length(): number;
    getID(): FeedID;
    push(data: T): Promise<string>;
}
