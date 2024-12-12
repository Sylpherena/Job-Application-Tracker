function TableHeader() {
  return (
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Position</th>
        <th>Company</th>
        <th>App. Date</th>
        <th>Country</th>
        <th>Location</th>
        <th>CV</th>
        <th>Cover Letter</th>
        <th></th>
      </tr>
    </thead>
  );
}

export default TableHeader;
