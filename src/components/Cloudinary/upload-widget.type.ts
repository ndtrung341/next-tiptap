export type UploadWidgetInstance = any;
export type CloudinaryInstance = any;

export interface UploadWidgetProps {
  children?: (options: UploadWidgetPropsChildren) => JSX.Element;
  onError?: UploadWidgetEventCallbackError;
  onSuccess?: UploadWidgetEventCallback;
}

export interface UploadWidgetPropsChildren {
  cloudinary?: any;
  widget?: UploadWidgetInstance;
  open: () => void;
}

export type UploadWidgetEvent =
  | "abort"
  | "batch-cancelled"
  | "close"
  | "display-changed"
  | "publicid"
  | "queues-end"
  | "queues-start"
  | "retry"
  | "show-completed"
  | "source-changed"
  | "success"
  | "tags"
  | "upload-added";

export interface UploadWidgetResults {
  event?: UploadWidgetEvent;
  info?: UploadWidgetInfo;
}

export interface UploadWidgetInfo {
  access_mode: "public" | "authenticated";
  api_key: string;
  asset_id: string;
  batchId: string;
  bytes: number;
  context: Record<string, Record<string, string>>;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  hook_execution: Record<string, unknown>;
  id: string;
  info: Record<string, unknown>;
  original_filename: string;
  pages: number;
  path: string;
  placeholder: boolean;
  public_id: string;
  resource_type: "image" | "raw" | "video" | "auto";
  secure_url: string;
  signature: string;
  tags: string[];
  thumbnail_url: string;
  type: "upload" | "private" | "authenticated";
  url: string;
  version: number;
  width: number;
  [key: string]: unknown;
}

export type UploadWidgetError =
  | {
      status: string;
      statusText: string;
    }
  | string
  | null;

export type UploadWidgetEventCallback = (
  results: UploadWidgetResults,
  widget: UploadWidgetInstance
) => void;

export type UploadWidgetEventCallbackError = (
  error: UploadWidgetError,
  widget: UploadWidgetInstance
) => void;
