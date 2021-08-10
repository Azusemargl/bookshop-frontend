import React from 'react'
import AuthorSearch from './AuthorSearch'
import FilterBlockInner from './FilterBlockInner'

const FilterBlock: React.FC<Props> = React.memo(({ category, filter, type, setFilter }) => {
   const [author, setAuthor] = React.useState('')

   // Categories selector for checkbox toggle and filter state changing
   const onCategoriesSelect: onCategoriesSelectProps = (filter, setFilter, currentCategory) => {
      if (filter.some(item => item.includes(currentCategory))) {
         if (filter.length === 1) setFilter(['']) // if current filter item is the last object of array
         else setFilter([...filter.filter(item => item !== currentCategory)]) // or remove current filter
      }
      else setFilter([...filter, currentCategory])

      if (type === 'search') setAuthor('')
   }
   
   return (
      <div className="filter__list">
         {type === 'search' ? (
            <AuthorSearch
               author={author}
               setAuthor={setAuthor}
               category={category}
               filter={filter}
               setFilter={setFilter}
               onCategoriesSelect={onCategoriesSelect}
            />
         ) : (
            category.map(item => {
               return (
                  <FilterBlockInner
                     key={item}
                     item={item}
                     filter={filter}
                     setFilter={setFilter}
                     onCategoriesSelect={onCategoriesSelect}
                  />
               )
            })
         )}
      </div>
   )
})

export default FilterBlock

// Types
type Props = {
   category: Array<string>
   filter: Array<string>
   type?: 'checkbox' | 'search'
   setFilter: (value: Array<string>) => void
}

export type onCategoriesSelectProps = (
   filter: Array<string>,
   setFilter: (value: Array<string>) => void,
   currentCategory: string
) => void