import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";
import moment from "moment";
import Job from "../models/Job.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../helper/checkPermissions.js";

// CREATE JOB
const createJob = async (req, res) => {
	const { position, company } = req.body;

	if (!position || !company) {
		throw new BadRequestError("Please provide all values");
	}
	req.body.createdBy = req.user.userId;
	const job = await Job.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

// DELETE JOB
const deleteJob = async (req, res) => {
	const { id: jobId } = req.params;
	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new NotFoundError(`No job with id :${jobId}`);
	}

	checkPermissions(req.user, job.createdBy);
	await job.remove();
	res.status(StatusCodes.OK).json({ msg: "Success! Job removed" });
};

// GET ALL JOBS
const getAllJobs = async (req, res) => {
	const { status, jobType, sort, search } = req.query;
	// console.log(req.query); //{ status: 'ok', jobType: 'all', sort: 'asc', search: 'sea ' }

	const queryObject = {
		createdBy: req.user.userId,
	};
	if (status && status !== "all") {
		queryObject.status = status;
	}
	if (jobType && jobType !== "all") {
		queryObject.jobType = jobType;
	}
	if (search) {
		queryObject.position = { $regex: search, $options: "i" };
	}

	// NO AWAIT
	let result = Job.find(queryObject);

	if (sort === "latest") {
		result = result.sort("-createdAt");
	}
	if (sort === "oldest") {
		result = result.sort("createdAt");
	}
	if (sort === "a-z") {
		result = result.sort("position");
	}
	if (sort === "z-a") {
		result = result.sort("-position");
	}

	const jobs = await result;

	res
		.status(StatusCodes.OK)
		.json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};

// UPDATE JOB
const updateJob = async (req, res) => {
	const { id: jobId } = req.params;
	const { company, position } = req.body;

	if (!position || !company) {
		throw new BadRequestError("Please provide all values");
	}
	const job = await Job.findOne({ _id: jobId });

	if (!job) {
		throw new NotFoundError(`No job with id :${jobId}`);
	}

	// check permissions
	checkPermissions(req.user, job.createdBy);

	const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
		new: true,
		runValidators: true,
	});

	res.status(StatusCodes.OK).json({ updatedJob });
};

// SHOW STATS
const showStats = async (req, res) => {
	let stats = await Job.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
		{ $group: { _id: "$status", count: { $sum: 1 } } },
	]);

	// stats =>  stats: [{ _id : "declined", count: 2 },
	//       { _id : "interview", count : 6 },
	//       { _id : "pending", count : 3 }]

	stats = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr;
		acc[title] = count;
		return acc;
	}, {});
	// updated stats become  newstats: { declined : 2, interview : 6, pending : 3 }

	// if user dont hav any job for status, display zero for each status
	const userStats = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	};

	let monthlyApplications = await Job.aggregate([
		{ $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				_id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
				count: { $sum: 1 },
			},
		},
		{ $sort: { "_id.year": -1, "_id.month": -1 } },
		{ $limit: 6 },
	]);

	// will return by each yr, mth from recent till oldest and limit to 6 mths
	// [
	// 	{ _id: { year: 2022, month: 9 }, count: 7 },
	// 	{ _id: { year: 2022, month: 8 }, count: 1 },
	// 	{ _id: { year: 2022, month: 6 }, count: 1 },
	// 	{ _id: { year: 2021, month: 9 }, count: 1 },
	// 	{ _id: { year: 2020, month: 12 }, count: 1 },
	// ];

	monthlyApplications = monthlyApplications
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item;
			const date = moment()
				.month(month - 1)
				.year(year)
				.format("MMM Y");
			return { date, count };
		})
		.reverse();

	// will return eg array with date at Mmm YYYY
	// [ { date: "Sep 2022", count: 4, },
	// 	{ date: "Aug 2022", count: 1, },
	// 	{ date: "Jun 2022", count: 1, },
	// 	{ date: "May 2022", count: 1, },
	// 	{ date: "Feb 2022", count: 1, },
	// 	{ date: "Sep 2021", count: 1, },
	// ];

	res.status(StatusCodes.OK).json({ userStats, monthlyApplications });
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
