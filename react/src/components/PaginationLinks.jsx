import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'


export const PaginationLinks = ({ meta, onPageClick }) => {
  
  const onClick = (ev, link) => {
    ev.preventDefault();
    if (!link.url) {
      return;
    }
    onPageClick(link)
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md mt-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          onClick={(ev) => onClick(ev, meta.links[0])}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Previous
        </a>
        <a
          href="#"
          onClick={(ev) => onClick(ev, meta.links[meta.links.length - 1])}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>
        <div>
          {/* {JSON.stringify(meta.links)} */}
          
          { meta.total >= meta.per_page &&
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {
              meta.links && meta.links.map((link, index) => {
                return <a
                  key={index}
                  href="#"
                  onClick={(ev) => onClick(ev, link)}
                  aria-current="page"
                  className={
                    "relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 "
                    // + (link.active ? 'bg-blue-500 ' : 'bg-gray-700 ')
                    + (link.active ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 focus:outline-offset-0 ')
                    + (index === 0 ? 'rounded-l-md ' : '')
                    + (index === (meta.links.length - 1) ? 'rounded-r-md ' : '')
                  }
                  dangerouslySetInnerHTML={{ __html: link.label }}
                ></a>
              })
            }
            </nav>
          }
        </div>
      </div>
    </div>
  )
}
