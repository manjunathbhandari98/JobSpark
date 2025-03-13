const Certification = (props: any) => {
  return (
    <div className="flex justify-between w-full">
      {/* company and about */}
      <div className="">
        {/* company */}
        <div className="flex gap-4">
          {/* logo */}
          <div className="bg-gray-800 p-2 rounded-lg">
            <img
              src={`/Icons/${props.issuer}.png`}
              alt=""
              className="h-8"
            />
          </div>
          {/* certificate */}
          <div>
            <div className="text-lg font-medium">
              {props.name}
            </div>
            <div className="flex [&>*]:text-sm">
              {props.issuer}
            </div>
          </div>
        </div>
      </div>

      {/* issued date */}
      <div className="space-y-1 text-end">
        <div>Issued {props.issuedDate}</div>
        <div>ID: {props.certificateId}</div>
      </div>
    </div>
  );
};

export default Certification;
