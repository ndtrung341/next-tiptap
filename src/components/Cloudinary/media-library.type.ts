// Via https://cloudinary.com/documentation/media_library_widget

export interface MediaLibraryOptions {
  // Authentication

  api_key: string;
  cloud_name: string;
  use_saml?: boolean;
  username?: string;

  // Clientside

  button_caption?: string;
  button_class?: string;
  inline_container?: string | HTMLElement;
  insert_caption?: string;
  remove_header?: boolean;
  z_index?: number;

  // Media Library Behavior

  default_transformations?: Array<Array<object>>;
  max_files?: number;
  multiple?: boolean;

  // Custom show() options

  asset?: { asset: object };
  collection?: { id?: string | number };
  folder?: { path?: string; resource_type?: string };
  search?: { expression?: string };
  transformation?: { url: string };
}

export interface MediaLibraryProps {
  children?: (options: MediaLibraryCallbackOptions) => JSX.Element;
  onClose?: (options: any) => void;
  onInsert?: (data: any, options?: any) => void;
  onOpen?: (options: any) => void;
  options?: MediaLibraryPropsOptions;
}

export interface MediaLibraryPropsOptions {
  asset?: MediaLibraryOptions["asset"];
  buttonCaption?: MediaLibraryOptions["button_caption"];
  buttonClass?: MediaLibraryOptions["button_class"];
  collection?: MediaLibraryOptions["collection"];
  defaultTransformations?: MediaLibraryOptions["default_transformations"];
  folder?: MediaLibraryOptions["folder"];
  inlineContainer?: MediaLibraryOptions["inline_container"];
  insertCaption?: MediaLibraryOptions["insert_caption"];
  maxFiles?: MediaLibraryOptions["max_files"];
  multiple?: MediaLibraryOptions["multiple"];
  removeHeader?: MediaLibraryOptions["remove_header"];
  search?: MediaLibraryOptions["search"];
  transformation?: MediaLibraryOptions["transformation"];
  username?: MediaLibraryOptions["username"];
  zIndex?: MediaLibraryOptions["z_index"];
}

export interface MediaLibraryCallbackOptions {
  cloudinary?: any;
  widget?: any;
  close?: () => void;
  open?: () => void;
}

export interface MediaLibraryInsertResults {
  mlId: string;
  assets: Array<MediaLibraryInsertResultsAsset>;
}

export interface MediaLibraryInsertResultsAsset {
  access_control: Array<object>;
  access_mode: string;
  bytes: number;
  created_at: string;
  created_by: { type: string; id: string };
  duration: number;
  format: string;
  height: number;
  metadata: any; // Array of?
  public_id: string;
  resource_type: string;
  secure_url: string;
  tags: Array<string>;
  type: string;
  uploaded_by: { type: string; id: string };
  url: string;
  version: number;
  width: number;
}
