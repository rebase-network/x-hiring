"use client";

import { Spinners } from "@/components/shared/icons";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { api } from "@/trpc/react";
import React, { memo } from "react";
import { useEffect, useRef } from "react";
import { JobItem } from "./job-item";

interface JobMoreProps {
  s?: string;
  dateRange?: string[];
  type?: "news" | "trending";
  tags?: string[];
  cursor: string;
}

export const JobMore = memo(
  ({
    s = "",
    dateRange = [],
    type = "news",
    tags = [],
    cursor,
  }: JobMoreProps) => {
    const bottomTriggerRef = useRef(null);
    const inView = useIntersectionObserver(bottomTriggerRef);

    const { data, error, fetchNextPage, hasNextPage } =
      api.job.queryWithCursor.useInfiniteQuery(
        {
          s,
          dateRange,
          type,
          tags,
        },
        {
          initialCursor: cursor,
          getNextPageParam(lastPage) {
            if (lastPage.nextCursor) {
              return lastPage.nextCursor;
            }
            return undefined;
          },
        },
      );

    useEffect(() => {
      if (inView) {
        console.log("inView");
        void fetchNextPage();
      }
    }, [inView, fetchNextPage]);

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    console.log("data?.pages", data?.pages);

    return (
      <>
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.map((job) => (
              <JobItem key={job.id} data={job} />
            ))}
          </React.Fragment>
        ))}
        {hasNextPage && (
          <div
            ref={bottomTriggerRef}
            className="col-span-5 lg:col-span-3 2xl:col-span-4"
          >
            <div className="flex h-80 w-full items-center justify-center text-4xl">
              <Spinners className="animate-spin" />
            </div>
          </div>
        )}
      </>
    );
  },
);

JobMore.displayName = "JobMore";