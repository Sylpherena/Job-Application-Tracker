export default function TableHeader() {
  return (
    <thead className="bg-primary bg-opacity-20 text-base-content/80">
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>App. Date</th>
        <th>Company</th>
        <th>Position</th>
        <th>
          <div className="flex justify-center items-center">Country</div>
        </th>
        <th>
          <div className="flex justify-center items-center">Location</div>
        </th>
        <th>
          <div className="flex justify-center items-center">CV</div>
        </th>
        <th>
          <div className="flex justify-center items-center">Cover Letter</div>
        </th>
      </tr>
    </thead>
  );
}
