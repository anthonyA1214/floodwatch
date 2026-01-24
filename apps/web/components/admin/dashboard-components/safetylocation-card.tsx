export default function SafetyLocationCard() {
  return (
    <section className="p-4">
      <div className="rounded-xl border border-emerald-400 p-4 bg-green-50 ">
        {/* Title */}
        <div className="flex items-start gap-2">
          <div>
            <h3 className="font-medium text-gray-900">
              Dr. Jose Rodriguez Memorial Hospital
            </h3>

            <p className="text-sm text-gray-600">
              Critical flood warning. Evacuation recommended.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
          <span> clock icon </span>
          <span>Open 24hrs</span>
        </div>
      </div>
    </section>
  );
}
