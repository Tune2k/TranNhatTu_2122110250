/* @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { clamp } from '../utilities.js';
/**
 * ProgressTracker is an event emitter that helps to track the ongoing progress
 * of many simultaneous actions.
 *
 * ProgressTracker reports progress activity in the form of a progress event.
 * The event.detail.totalProgress value indicates the elapsed progress of all
 * activities being tracked by the ProgressTracker.
 *
 * The value of totalProgress is a number that progresses from 0 to 1. The
 * ProgressTracker allows for the lazy accumulation of tracked actions, so the
 * total progress represents an abstract, non-absolute progress towards the
 * completion of all currently tracked events.
 *
 * When all currently tracked activities are finished, the ProgressTracker
 * emits one final progress event and then resets the list of its currently
 * tracked activities. This means that from an observer's perspective,
 * ongoing activities will accumulate and collectively contribute to the notion
 * of total progress until all currently tracked ongoing activities have
 * completed.
 */
export class ProgressTracker extends EventTarget {
    constructor() {
        super(...arguments);
        this.ongoingActivities = new Set();
        this.totalProgress = 0;
    }
    /**
     * The total number of activities currently being tracked.
     */
    get ongoingActivityCount() {
        return this.ongoingActivities.size;
    }
    /**
     * Registers a new activity to be tracked by the progress tracker. The method
     * returns a special callback that should be invoked whenever new progress is
     * ready to be reported. The progress should be reported as a value between 0
     * and 1, where 0 would represent the beginning of the action and 1 would
     * represent its completion.
     *
     * There is no built-in notion of a time-out for ongoing activities, so once
     * an ongoing activity is begun, it is up to the consumer of this API to
     * update the progress until that activity is no longer ongoing.
     *
     * Progress is only allowed to move forward for any given activity. If a lower
     * progress is reported than the previously reported progress, it will be
     * ignored.
     */
    beginActivity(reason) {
        const activity = { progress: 0, completed: false };
        this.ongoingActivities.add(activity);
        if (this.ongoingActivityCount === 1) {
            // Announce the first progress event (which should always be 0 / 1
            // total progress):
            this.announceTotalProgress(activity, 0, reason);
        }
        return (progress) => {
            let nextProgress;
            nextProgress = Math.max(clamp(progress, 0, 1), activity.progress);
            if (nextProgress !== activity.progress) {
                this.announceTotalProgress(activity, nextProgress, reason);
            }
            return activity.progress;
        };
    }
    announceTotalProgress(updatedActivity, nextProgress, reason) {
        let progressLeft = 0;
        let completedActivities = 0;
        if (nextProgress == 1.0)
            updatedActivity.completed = true;
        for (const activity of this.ongoingActivities) {
            const { progress } = activity;
            progressLeft += 1.0 - progress;
            if (activity.completed) {
                completedActivities++;
            }
        }
        const lastProgress = updatedActivity.progress;
        updatedActivity.progress = nextProgress;
        // Advance the total progress by the fraction of total remaining progress
        // due to this activity.
        this.totalProgress += (nextProgress - lastProgress) *
            (1.0 - this.totalProgress) / progressLeft;
        const totalProgress = completedActivities === this.ongoingActivityCount ?
            1.0 :
            this.totalProgress;
        this.dispatchEvent(new CustomEvent('progress', { detail: { totalProgress, reason } }));
        if (completedActivities === this.ongoingActivityCount) {
            this.totalProgress = 0.0;
            this.ongoingActivities.clear();
        }
    }
}
//# sourceMappingURL=progress-tracker.js.map