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
        <th>Country</th>
        <th>Location</th>
        <th>CV</th>
        <th>Cover Letter</th>
      </tr>
    </thead>
  );
}
