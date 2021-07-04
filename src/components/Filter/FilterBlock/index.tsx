import React from 'react'

const FilterBlock: React.FC<Props> = React.memo(({ title, category, filter, setFilter }) => {
   
   // Categories selector
   const onCategoriesSelect = (filter: Array<string>, setFilter: (value: Array<string>) => void, category: string) => {
      if (filter.some(item => item.includes(category))) setFilter([...filter.filter(item => item !== category)])
      else setFilter([...filter, category])
   }

   return (
      <div className="filter__block">
         <p className="filter__title">{title}:</p>
         <div className="filter__list">
            {category.map(item => {
               return (
                  <div className="filter__list-box" key={item}>
                     <input type="checkbox" checked={filter.some(value => value === item)} id={item} value={item} onChange={e => {
                        return onCategoriesSelect(filter, setFilter, item)
                     }} />
                     <label htmlFor={item}>{item}</label>
                  </div>
               )
            })}
         </div>
      </div>
   )
})

export default FilterBlock

// Types
type Props = {
   title: string
   category: Array<string>
   filter: Array<string>
   setFilter: (value: Array<string>) => void
}
