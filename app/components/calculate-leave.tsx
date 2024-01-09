interface CalculateLeaveProps {
    totalToilHours: number;
  }

  const CalculateLeave: React.FC<CalculateLeaveProps> = ({ totalToilHours }) => {
    const totalLeave = totalToilHours / 7.6;
    let funComment;

    if (totalLeave > 0) {
        funComment = "Take that holiday 🏖";
    }
  
    return (
      <div>
        <div className="text-lg font-semibold">You have: {totalLeave} days of leave! {funComment} </div>
        <div className="leading-7 [&:not(:first-child)]:mt-6">This was calculated on a 7.6 hour work day. </div>
      </div>
    );
  };
  
  export default CalculateLeave;