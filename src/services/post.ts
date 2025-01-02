import { mock } from "@/sample";

export const getPost = (): Promise<any> => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        try {
          const data = localStorage.getItem("post");
          resolve(data ? JSON.parse(data) : mock);
          if (!data) savePost(mock);
        } catch {
          resolve(mock);
        }
      }

      return resolve(mock);
    }, 200);
  });
};

export const savePost = (data: any) => {
  if (typeof window === "undefined") return;

  try {
    const value = data?.content?.trim() ? { ...mock, ...data } : mock;
    localStorage.setItem("post", JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};
