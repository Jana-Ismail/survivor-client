import { Link, useLocation, useParams } from "react-router-dom"

export const SeasonLogFilter = () => {
    const location = useLocation()
    const { seasonLogId } = useParams()

    // Get the current filter from the URL
    const currentPath = location.pathname
    const basePath = `/season-logs/${seasonLogId}`

    return (
        <div className="flex justify-center space-x-4 my-4">
          <Link
            to={basePath}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPath === basePath
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Survivors
          </Link>
          <Link
            to={`${basePath}/episodes`}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPath.includes('/episodes')
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Episodes
          </Link>
          <Link
            to={`${basePath}/favorites`}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentPath.includes('/favorites')
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Favorites
          </Link>
        </div>
    )
}  
