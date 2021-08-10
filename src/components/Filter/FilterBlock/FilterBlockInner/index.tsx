import React from 'react'
import { onCategoriesSelectProps } from '..'

const FilterBlockInner: React.FC<FilterBlockInnerProps> = React.memo(({ item, filter, setFilter, onCategoriesSelect }) => {
   return (
      <div className="filter__list-box">
         <input type="checkbox" checked={filter.some(value => value === item)} id={item} value={item} onChange={e => {
            return onCategoriesSelect(filter, setFilter, item)
         }} />
         <label htmlFor={item}>{item}</label>
      </div>
   )
})

export default FilterBlockInner

type FilterBlockInnerProps = {
   item: string
   filter: Array<string>
   setFilter: (value: Array<string>) => void
   onCategoriesSelect: onCategoriesSelectProps
}