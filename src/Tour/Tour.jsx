import React, { useEffect, useState } from "react";
import {
  useQueries,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createTour,
  getAllTour,
  getTour,
  deleteTour,
  updateTour,
} from "./api/tourApi";
import Bear from "../Bear/Bear";
import useStore from "../store/store";

const Tour = () => {
  const queryClient = useQueryClient();
  const allData = useStore((state) => state.tours);
  const keep = useStore((state) => state.keep);
  const myTours = useStore((state) => state.tours);

  console.log("MYTour", myTours);

  const [state, setState] = useState({
    name: "",
    price: "",
    rating: "",
  });

  const [updateFlag, setUpdateFlag] = useState(false);
  //   const id = "64e45df9258003381d0859a6";
  //   const ids = ["64e45df9258003381d0859a6", "64e45e95fd1c8039a0445973"];
  const { isLoading, data, isError, error } = useQuery(["tours"], getAllTour);
  // const allTours = useQuery(["tours"], getAllTour);

  useEffect(() => {
    keep(data?.data);
  }, [data]);

  console.log(allData);
  //   const { data: tourDetail } = useQuery(["tours", id], () => getTour(id));
  //   const response = useQueries({
  //     queries: ids.map((id) => {
  //       return {
  //         queryKey: ["tours", id],
  //         queryFn: getTour(id),
  //         staleTime: Infinity,
  //       };
  //     }),
  //   });

  const { mutate: createNewTour } = useMutation(createTour, {
    onSuccess: () => {
      console.log("data created successfully");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
    onError: (err) => {
      console.log("Error occured", err);
    },
  });

  const { mutate: removeTour, isLoading: deleteLoading } = useMutation(
    deleteTour,
    {
      onSuccess: () => {
        console.log("Delete Success");
        queryClient.invalidateQueries("tours");
      },
    }
  );

  const { mutate: update, isLoading: updateLoading } = useMutation(updateTour, {
    onSuccess: () => {
      console.log("Update Success");
      queryClient.invalidateQueries("tours");
    },
  });

  const stateChangeHandler = (val) => {
    setState((prev) => ({ ...prev, ...val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    createNewTour(state);
  };

  const updateSubmit = (id) => {
    setUpdateFlag(!updateFlag);
    console.log(state);
    console.log(id);
    update(state);
  };

  const editHandler = (e, id) => {
    e.preventDefault();
    console.log(id);
    stateChangeHandler({ _id: id });
    setUpdateFlag(!updateFlag);
  };

  const deleteHandler = (e, id) => {
    e.preventDefault();
    console.log(id);
    removeTour(id);
  };

  return (
    <>
      <Bear />
      <>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            onChange={(e) =>
              stateChangeHandler({
                name: e.target.value,
              })
            }
          />
          <label>Rating</label>
          <input
            type="number"
            onChange={(e) =>
              stateChangeHandler({
                rating: e.target.value,
              })
            }
          />
          <label>Price</label>
          <input
            type="number"
            onChange={(e) =>
              stateChangeHandler({
                price: e.target.value,
              })
            }
          />
          <button type="submit">Click to create tour</button>
        </form>
      </>
      {myTours?.tours?.map((tour) => (
        <div key={tour._id}>
          <h1>{tour.name}</h1>
          <h2>{tour.price}</h2>
          <h2>{tour.rating}</h2>
          <button onClick={(e) => editHandler(e, tour._id)}>Edit</button>
          <button onClick={(e) => deleteHandler(e, tour._id)}>
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))}
      {/* {updateFlag && (
        <>
          <label>Name</label>
          <input
            onChange={(e) =>
              stateChangeHandler({
                name: e.target.value,
              })
            }
          />
          <label>Rating</label>
          <input
            type="number"
            onChange={(e) =>
              stateChangeHandler({
                rating: e.target.value,
              })
            }
          />
          <label>Price</label>
          <input
            type="number"
            onChange={(e) =>
              stateChangeHandler({
                price: e.target.value,
              })
            }
          />
          <button onClick={updateSubmit}>Click to update tour</button>
        </>
      )} */}
      {/* {data?.data.tours.map((tour) => (
        <div key={tour._id}>
          <h1>{tour.name}</h1>
          <h2>{tour.price}</h2>
          <h2>{tour.rating}</h2>
          <button onClick={(e) => editHandler(e, tour._id)}>Edit</button>
          <button onClick={(e) => deleteHandler(e, tour._id)}>
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      ))} */}
    </>
  );
};

export default Tour;
