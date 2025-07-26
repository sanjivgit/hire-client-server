
const DeleteAccountInfo = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-6 text-black">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
                <h1 className="text-2xl font-semibold text-center text-red-600">Account Deletion Steps</h1>

                <ol className="list-decimal list-inside space-y-2 text-lg">
                    <li>
                        Go to <strong>Profile</strong> (Open <strong>Ridhi Solution</strong> app and navigate to the profile section).
                    </li>
                    <li>
                        Find the <strong>Delete Account</strong> option.
                    </li>
                    <li>
                        Click on it and read the note.
                    </li>
                    <li>
                        Click on <strong>Delete</strong> button to delete the account.
                    </li>
                </ol>

                <div className="border-t pt-4">
                    <h2 className="text-xl font-semibold text-red-500">Important Information</h2>
                    <p className="text-gray-700 mt-2">
                        If you choose to delete your account, it will be <strong>scheduled for permanent deletion after 90 days</strong>.
                        During this period:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                        <li>Your data will remain inactive and will not be accessible to others.</li>
                        <li>If you log in again within these 90 days, your account will be recovered automatically, and the deletion process will be canceled.</li>
                        <li>
                            However, if you do not log in during this time, your account and all associated data will be permanently deleted and <strong>cannot be restored</strong>.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountInfo;
