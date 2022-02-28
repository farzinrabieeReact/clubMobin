import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CardNoData from "../../../common/components/cardNoData";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../redux/education/competitions_select_archiveCompetitions/index";
import { useSubheader } from "../../../../_metronic/layout";

import CardArchive from "./CardArchive";

const CompetitionsArchive = () => {
  const dispatsh = useDispatch();
  const state = useSelector(state => state.reducer_select_archive_competitions);

  const suhbeader = useSubheader();
  suhbeader.setTitle("آرشیو مسابقات");

  useEffect(() => {
    dispatsh({ type: actionTypes.archive_competitionsAsync });
  }, []);//eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="bg-white rounded-lg py-10 px-3 shadow m-5">
        <div>
          <Link to="/competitions">
            <button className="btn btn-sm btn-light font-weight-bold py-2 px-4 px-xxl-5 my-1 h5">
              مسابقات فعال
            </button>
          </Link>
        </div>

        {state.data.length === 0 ? (
          <div className="mt-5">
            <CardNoData text="در حال حاضر مسابقه ای برای نمایش وجود ندارد." />
          </div>
        ) : (
          <>
            {state.data.map((item, ind) => (
              <CardArchive key={ind} data={item} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default CompetitionsArchive;
