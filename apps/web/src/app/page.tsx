export default function Component() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 font-mono text-gray-600">
      <div className="w-full max-w-[600px] space-y-8">
        <div className="text-center space-y-1">
          <div className="uppercase">"Yufugumi"</div>
          <div className="text-sm">c/o: <a href="https://tom.so" className="hover:text-blue-900">tom hackshaw</a></div>
        </div>

        <div className="border-t border-b border-gray-300 py-4 space-y-2">
          <div className="flex justify-between">
            <div>A creative office and research lab</div>
            <div>芸術スタジオと研究室</div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 text-sm">
            <div>Creation date</div>
            <div>August 20, 1995</div>
            <div>#</div>
            <div>1094764</div>
            <div>Reference</div>
            <div>info@yufugumi.com</div>
            <div>Payment method</div>
            <div>American Express ...1995</div>
            <div>Tax/VAT</div>
            <div>¥0</div>
          </div>
        </div>

        <div className="flex justify-between">
          <div>In search of</div>
          <div>意味のあること</div>
        </div>

        <div className="text-center text-sm space-y-1 pt-8">
          <div>(˶ᵔ ᵕ ᵔ˶)</div>
          <div>Te Upoko o te Ika</div>
          <div>Aoteroa</div>
          <div>b. 1995</div>
        </div>

        <div className="text-center space-y-4 pt-8">
          <div className="text-sm">For your consideration</div>
          <div className="text-xs">
            If further help is needed, please{" "}
            <a
              href="mailto:info@yufugumi.com"
              className="underline hover:text-blue-900"
            >
              send us
            </a>{" "}
            a note.
          </div>
        </div>
      </div>
    </div>
  );
}
