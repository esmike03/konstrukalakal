import { usePage, Link } from "@inertiajs/react";

export default function ReportedUsers() {
  const { reports } = usePage().props;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reported Item</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Reported Item
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Reported Owner
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Reported By
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {reports.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No reports found.
                </td>
              </tr>
            ) : (
              reports.map((report, index) => (
                <tr
                  key={report.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                        <Link href={`/materials/${report.reported_item?.id}`}>
                            {report.reported_item?.material_name ?? "Unknown"} {'>'}
                         </Link>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                        <Link href={`/profile-view/${report.reported_user?.id}`}>
                            {report.reported_user?.name ?? "Unknown"} {'>'}
                         </Link>
                    </td>


                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        <Link href={`/profile-view/${report.reported_by?.id}`}>
                            {report.reported_by?.name ?? "Unknown"} {'>'}
                        </Link>
                    </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {report.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(report.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
