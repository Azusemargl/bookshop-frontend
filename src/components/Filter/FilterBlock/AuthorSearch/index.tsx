import React, { Fragment } from "react"
import FilterBlockInner from "../FilterBlockInner"
import { onCategoriesSelectProps } from ".."
import { CloseOutlined } from "@ant-design/icons"

const AuthorsList: React.FC<AuthorsListProps> = React.memo(({
   authorsFiltered, filter, setFilter, onCategoriesSelect, limit = authorsFiltered.length
}) => {
   return (
      <Fragment>
         {authorsFiltered.filter(item => !filter.includes(item)).map((item, index) => {
            return (
               <Fragment key={item}>
                  {(index + 1) <= limit &&
                     <FilterBlockInner
                        item={item}
                        filter={filter}
                        setFilter={setFilter}
                        onCategoriesSelect={onCategoriesSelect}
                     />
                  }
               </Fragment>
            )
         })}
      </Fragment>
   )
})

const AuthorSearch: React.FC<Props> = React.memo(({
   author, setAuthor, category, filter, setFilter, onCategoriesSelect
}) => {
   const authorsFiltered = category.filter(item => item.toLowerCase().includes(author.toLowerCase()))

   return (
      <Fragment>
         <div className="filter__search">
            {author && <CloseOutlined onClick={e => setAuthor('')} />}
            <input type="text" value={author} placeholder="Поиск автора" onChange={e => setAuthor(e.target.value)} />
         </div>

         {/* Active authors */}
         {authorsFiltered.map(item => {
            return (
               <Fragment key={item}>
                  {filter.some(value => value === item) &&
                     <FilterBlockInner
                        key={item}
                        item={item}
                        filter={filter}
                        setFilter={setFilter}
                        onCategoriesSelect={onCategoriesSelect}
                     />
                  }
               </Fragment>
            )
         })}

         {/* List */}
         {!!authorsFiltered.length &&
            <div className="filter__list">
               <AuthorsList
                  authorsFiltered={authorsFiltered}
                  setAuthor={setAuthor}
                  filter={filter}
                  setFilter={setFilter}
                  onCategoriesSelect={onCategoriesSelect}
               />
            </div>
         }

         {/* Searching list */}
         {author && !!authorsFiltered.length &&
            <div className="filter__authors-list">
               <AuthorsList
                  authorsFiltered={authorsFiltered}
                  setAuthor={setAuthor}
                  filter={filter}
                  setFilter={setFilter}
                  onCategoriesSelect={onCategoriesSelect}
                  limit={3}
               />
            </div>
         }
      </Fragment>
   )
})

export default AuthorSearch

// Types
type Props = {
   author: string
   setAuthor: (value: string) => void
   category: Array<string>
   filter: Array<string>
   setFilter: (value: Array<string>) => void
   onCategoriesSelect: onCategoriesSelectProps
}
type AuthorsListProps = {
   authorsFiltered: Array<string>
   setAuthor: (value: string) => void
   filter: Array<string>
   setFilter: (value: Array<string>) => void
   onCategoriesSelect: onCategoriesSelectProps
   limit?: number
}