import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
  node: Element;
}

interface UseTocOptions {
  containerSelector: string;
  headingSelector?: string;
  observerOptions?: IntersectionObserverInit;
}

export default function useToc(options: UseTocOptions) {
  const { containerSelector, headingSelector = "h2, h3, h4", observerOptions } = options;

  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const container = document.body.querySelector(containerSelector);

    if (!container) return;

    const mutationObserver = new MutationObserver(() => {
      const headings = container.querySelectorAll(headingSelector);

      const items = Array.from(headings).map((heading) => ({
        id: heading.id,
        text: heading.textContent || "",
        level: parseInt(heading.tagName[1]),
        node: heading,
      }));

      setItems(items);
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => mutationObserver.disconnect();
  }, [containerSelector, headingSelector]);

  useEffect(() => {
    const elements = items.map((item) => item.node);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach((element) => observer.observe(element));

    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [items]);

  return { items, activeId };
}
