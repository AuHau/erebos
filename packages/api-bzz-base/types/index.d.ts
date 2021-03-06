/// <reference types="node" />
import * as stream from 'stream';
import { hexInput, hexValue } from '@erebos/hex';
import { Observable } from 'rxjs';
import { BaseResponse, RequestInit, Fetch, BzzConfig, BzzMode, DirectoryData, DownloadOptions, FeedMetadata, FeedParams, FeedUpdateParams, FetchOptions, ListResult, PinOptions, PinnedFile, PollOptions, PollFeedOptions, PollFeedContentHashOptions, PollFeedContentOptions, SignBytesFunc, Tag, UploadOptions, FileEntry } from './types';
export * from './feed';
export * from './types';
export declare const BZZ_MODE_PROTOCOLS: {
    default: string;
    feed: string;
    immutable: string;
    pin: string;
    raw: string;
    tag: string;
};
export declare function getModeProtocol(mode?: BzzMode): string;
export declare class HTTPError extends Error {
    status: number;
    constructor(status: number, message: string);
}
export declare function resOrError<R extends BaseResponse>(res: R): R;
export declare function resJSON<R extends BaseResponse, T = any>(res: R): Promise<T>;
export declare function resStream<R extends BaseResponse<stream.Readable>, T = any>(res: R): stream.Readable | ReadableStream;
export declare function resText<R extends BaseResponse>(res: R): Promise<string>;
export declare function resHex<R extends BaseResponse>(res: R): Promise<hexValue>;
export declare function resSwarmHash<R extends BaseResponse>(res: R): Promise<string>;
export declare function isDirectoryData(data: string | Buffer | stream.Readable | ReadableStream | DirectoryData): data is DirectoryData;
export declare class BaseBzz<Response extends BaseResponse, Readable extends stream.Readable> {
    protected defaultTimeout: number;
    protected fetch: Fetch<Response>;
    protected signBytes: SignBytesFunc;
    protected url: string;
    constructor(fetch: Fetch<Response>, config: BzzConfig);
    protected fetchTimeout(url: string, options: FetchOptions, params?: RequestInit): Promise<Response>;
    sign(bytes: Array<number>, params?: any): Promise<hexValue>;
    getDownloadURL(hash: string, options?: DownloadOptions, raw?: boolean): string;
    getUploadURL(options?: UploadOptions, raw?: boolean): string;
    getFeedURL(hashOrParams: string | FeedParams | FeedUpdateParams, flag?: 'meta'): string;
    getPinURL(hash?: string, raw?: boolean): string;
    hash(domain: string, options?: FetchOptions): Promise<hexValue>;
    list(hash: string, options?: DownloadOptions): Promise<ListResult>;
    download(hash: string, options?: DownloadOptions): Promise<Response>;
    downloadStream(hash: string, options?: DownloadOptions): Promise<Readable>;
    protected downloadTar(hash: string, options: DownloadOptions): Promise<Response>;
    downloadObservable(hash: string, options?: DownloadOptions): Observable<FileEntry>;
    protected normalizeStream(stream: Readable | ReadableStream | NodeJS.ReadableStream): Readable;
    downloadDirectoryData(hash: string, options?: DownloadOptions): Promise<DirectoryData>;
    protected uploadBody(body: Buffer | FormData | Readable, options: UploadOptions, raw?: boolean): Promise<hexValue>;
    uploadFile(data: string | Buffer | Readable, options?: UploadOptions): Promise<hexValue>;
    uploadDirectory(_directory: DirectoryData, _options?: UploadOptions): Promise<hexValue>;
    upload(data: string | Buffer | Readable | DirectoryData, options?: UploadOptions): Promise<hexValue>;
    deleteResource(hash: string, path: string, options?: FetchOptions): Promise<hexValue>;
    createFeedManifest(params: FeedParams, options?: UploadOptions): Promise<hexValue>;
    getFeedMetadata(hashOrParams: string | FeedParams, options?: FetchOptions): Promise<FeedMetadata>;
    getFeedChunk(hashOrParams: string | FeedParams, options?: FetchOptions): Promise<Response>;
    getFeedContentHash(hashOrParams: string | FeedParams, options?: FetchOptions): Promise<string>;
    getFeedContent(hashOrParams: string | FeedParams, options?: DownloadOptions): Promise<Response>;
    pollFeedChunk(hashOrParams: string | FeedParams, options: PollFeedOptions): Observable<Response>;
    pollFeedContentHash(hashOrParams: string | FeedParams, options: PollFeedContentHashOptions): Observable<string | null>;
    pollFeedContent(hashOrParams: string | FeedParams, options: PollFeedContentOptions): Observable<Response | null>;
    postSignedFeedChunk(params: FeedUpdateParams, body: Buffer, options?: FetchOptions): Promise<Response>;
    postFeedChunk(meta: FeedMetadata, data: hexInput, options?: FetchOptions, signParams?: any): Promise<Response>;
    setFeedChunk(hashOrParams: string | FeedParams, data: hexInput, options?: FetchOptions, signParams?: any): Promise<Response>;
    setFeedContentHash(hashOrParams: string | FeedParams, contentHash: string, options?: FetchOptions, signParams?: any): Promise<Response>;
    setFeedContent(hashOrParams: string | FeedParams, data: string | Buffer | DirectoryData, options?: UploadOptions, signParams?: any): Promise<hexValue>;
    pinEnabled(options?: FetchOptions): Promise<boolean>;
    pin(hash: string, options?: PinOptions): Promise<void>;
    unpin(hash: string, options?: FetchOptions): Promise<void>;
    pins(options?: FetchOptions): Promise<Array<PinnedFile>>;
    getTag(hash: string, options?: FetchOptions): Promise<Tag>;
    pollTag(hash: string, options: PollOptions): Observable<Tag>;
}
