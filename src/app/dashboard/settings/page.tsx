export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 dark:bg-slate-900 dark:bg-slate-900 rounded-xl p-6 shadow max-w-xl">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3"
          />

          <button className="bg-blue-600 text-black dark:text-white px-5 py-3 rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}