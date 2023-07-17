"use client";

import qs from "query-string";

import { useRouter, useSearchParams } from "next/navigation";

import { Color, Size } from "@/types";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  filterKey: string;
}
const Filter: React.FC<FilterProps> = ({ data, name, filterKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(filterKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());
    const query = { ...current, [filterKey]: id };

    if (current[filterKey] === id) {
      query[filterKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };
  return (
    <div className='md-8'>
      <h3 className='text-lg font-semibold'>{name}</h3>
      <hr className='my-4 ' />
      <div className='flex flex-wrap gap-2'>
        {data.map((filter) => (
          <div key={filter.id} className='flex items-center'>
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-black text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
